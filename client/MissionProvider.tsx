import React, { useContext, useState, useEffect } from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { MissionData, MissionResponse } from "@/models/models";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://api.spacex.land/graphql/" }),
  cache: new InMemoryCache(),
});

import { GET_MISSIONS } from "@/Queries";

const MissionContext = React.createContext([] as any);

export const useMission = () => useContext(MissionContext);

const MissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [missions, setMissions] = useState([] as MissionData[]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [more, setMore] = useState(true);
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(true);
  const [singleMission, setSingleMission] = useState({} as MissionData);
  const [currMission, setCurrMission] = useState(-1);

  const loadMissions = () => {
    return client
      .query({
        query: GET_MISSIONS,
        variables: { limit: perPage, offset: page * perPage },
      })
      .then((response: MissionResponse) => {
        const data = response.data.launchesPast;
        setPage((p) => p + 1);
        if (data.length == 0 || data.length < perPage) {
          setMore(false);
        }
        return data;
      })
      .catch((err) => console.error(err));
  };

  const loadMore = async (callback?: Function) => {
    if (more) {
      setLoading(true);
      try {
        const data = await loadMissions();
        setMissions((m) => [...m, ...(data || [])]);
      } finally {
        setLoading(false);
        if (callback) {
          callback();
        }
      }
    }
  };

  const prevMission = () => {
    if (currMission > 0) {
      if (currMission == 1) setCanPrev(false);
      setSingleMission(missions[currMission - 1]);
      setCurrMission((c) => c - 1);
      if (!canNext) setCanNext(true);
    }
  };

  const nextMission = async () => {
    if (currMission == missions.length - 1) {
      const data = await loadMissions();
      if (data?.length == 0) {
        setCanNext(false);
      } else {
        setMissions((m) => [...m, ...(data || [])]);
        //@ts-ignore
        setSingleMission(data[0]);
        setCurrMission((c) => c + 1);
        setCanPrev(true);
      }
    } else {
      setSingleMission(missions[currMission + 1]);
      setCurrMission((c) => c + 1);
      setCanPrev(true);
    }
  };

  const setSingle = (missionData: MissionData) => {
    if (!missionData.mission_name) {
      setSingleMission({} as MissionData);
      return;
    }
    const index = missions.findIndex((x) => x.mission_name == missionData.mission_name);
    if (index == 0) setCanPrev(false);
    setCurrMission(index);
    setSingleMission(missionData);
  }

  useEffect(() => {
    loadMissions().then((data) => {
      setMissions(data || []);
      setInit(false);
      setLoading(false);
    });
  }, []);

  return (
    <MissionContext.Provider
      value={{
        missions,
        setPage,
        setPerPage,
        loading,
        loadMore,
        init,
        more,
        singleMission,
        setSingle,
        prevMission,
        nextMission,
        canNext,
        canPrev,
        currMission,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export default MissionProvider;
