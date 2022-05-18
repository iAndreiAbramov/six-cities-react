export enum TabQueryName {
    Paris = 'paris',
    Cologne = 'cologne',
    Brussels = 'brussels',
    Amsterdam = 'amsterdam',
    Hamburg = 'hamburg',
    Dusseldorf = 'dusseldorf',
}

export enum TabScreenName {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf',
}

export interface ITabItem {
    id: number;
    name: TabScreenName;
    queryName: TabQueryName;
}
