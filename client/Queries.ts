import gql from "graphql-tag";

export const GET_MISSIONS = gql`
  query GetMissions($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      launch_date_local
      launch_site {
        site_name
        site_name_long
      }
      links {
        article_link
        video_link
        wikipedia
      }
      rocket {
        rocket_name
        fairings {
          recovered
        }
      }
      ships {
        name
        home_port
        image
        weight_kg
      }
    }
  }
`;
