import type { APISpaceXResponse, Doc } from '../types/api';

type GetLaunchByProps = {
  id: string;
};

export const getLaunchBy = async ({ id }: GetLaunchByProps) => {
  const resp = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
  const doc = (await resp.json()) as Doc;

  return doc;
};

export const getLatestLaunches = async () => {
  const resp = await fetch('https://api.spacexdata.com/v5/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: 'asc',
        },
        limit: 12,
      },
    }),
  });
  const { docs: launches } = (await resp.json()) as APISpaceXResponse;

  return launches;
};
