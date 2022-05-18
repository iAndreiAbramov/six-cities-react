import { ITabItem, TabQueryName, TabScreenName } from 'types/tabs.types';

export const homePageTabs: ITabItem[] = [
    {
        id: 1,
        name: TabScreenName.Paris,
        queryName: TabQueryName.Paris,
    },
    {
        id: 2,
        name: TabScreenName.Cologne,
        queryName: TabQueryName.Cologne,
    },
    {
        id: 3,
        name: TabScreenName.Brussels,
        queryName: TabQueryName.Brussels,
    },
    {
        id: 4,
        name: TabScreenName.Amsterdam,
        queryName: TabQueryName.Amsterdam,
    },
    {
        id: 5,
        name: TabScreenName.Hamburg,
        queryName: TabQueryName.Hamburg,
    },
    {
        id: 6,
        name: TabScreenName.Dusseldorf,
        queryName: TabQueryName.Dusseldorf,
    },
];
