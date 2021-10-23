export interface MissionData {
  mission_name: string,
  launch_date_local: string,
  launch_site: LaunchSite,
  links: MissionLinks,
  rocket: Rocket,
  ships: Ship[]
}

export interface MissionContext {
  missions: MissionData[],
  setPage: (page: number) => void,
  setPerPage: (perPage: number) => void,
  loading: boolean,
  init: boolean,
  loadMore: (callback?: Function) => void,
  more: boolean,
  singleMission: MissionData,
  setSingle: (missionNumber: Object) => void,
  nextMission: () => void,
  prevMission: () => void,
  canNext: boolean,
  canPrev: boolean,
  currMission: number
}

export interface MissionResponse {
  data: {
    launchesPast: MissionData[]
  }
}

interface LaunchSite {
  site_name_long: string,
  site_name: string
}

interface MissionLinks {
  article_link: string,
  video_link: string,
  wikipedia: string
}

interface Rocket {
  rocket_name: string,
  fairings: {
    recovered: boolean
  }
}

export interface Ship {
  name: string,
  home_port: string,
  image: string,
  weight_kg: number
}