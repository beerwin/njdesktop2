export const treeviewConfig = {
    // treeviews not necessarily need headers
    // headers: {
    //     columns: [
    //         {
    //             columnId: 'name',
    //             value: 'Directory',
    //         }
    //     ]
    // }
}

export const treeviewItems = [
    {
        columns: [
            {
                columnId: 'name',
                value: 'files',
            },
        ],
        fullPath: 'files',
        expanded: true,
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'downloads'
                    },
                ],
                fullPath: 'files/downloads',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'music'
                    },
                ],
                fullPath: 'files/music',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'videos'
                    },
                ],
                fullPath: 'files/videos',
                items: [],
            },
        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'recovery'
            },
        ],
        fullPath: 'recovery',
        items: [],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'system'
            },
        ],
        fullPath: 'system',
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'drivers',
                    },
                ],
                fullPath: 'system/drivers',
                items: [
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'etc'
                            },
                        ],
                        fullPath: 'system/drivers/etc',
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'cache'
                            },
                        ],
                        fullPath: 'system/drivers/cache',
                        items: [
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'internal'
                                    },
                                ],
                                fullPath: 'system/drivers/cache/internal',
                                items: [],
                            },
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'third-party'
                                    },
                                ],
                                fullPath: 'system/drivers/cache/third-party',
                                items: [],
                            },

                        ],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'network'
                            },
                        ],
                        fullPath: 'system/drivers/network',
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'modules'
                            },
                        ],
                        fullPath: 'system/drivers/modules',
                        items: [],
                    },

                ],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'lib'
                    },
                ],
                fullPath: 'system/lib',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'objects'
                    },
                ],
                fullPath: 'system/objects',
                items: [],
            },

        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'users'
            },
        ],
        fullPath: 'users',
        items: [],
    },
]

export const withIcons = (items) => {
    return items.map(i => {
        return {
            ...i,
            icon: 'url(assets/img/folder.svg)',
            iconColumn: 'name',
            items: withIcons(i.items)
        }
    })
}