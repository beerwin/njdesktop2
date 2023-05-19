const files = {
    '///root///': [
        {
            name: 'files',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'files',
        },
        {
            name: 'recovery',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'recovery',
        },
        {
            name: 'system',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'system',
        },
        {
            name: 'users',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'users',
        },
    ],
    'files': [
        {
            name: 'downloads',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'files/downloads',
        },
        {
            name: 'music',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'files/music',
        },
        {
            name: 'videos',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-13'),
            fullPath: 'files/videos',
        },
        {
            name: 'list.txt',
            type: 'text',
            size: '1572',
            date: new Date('2022-12-10'),
            fullPath: 'files/lists.txt',
        },
    ],
    'files/downloads': [
        {
            name: 'various.mp3',
            type: 'audio/mp3',
            size: '32458458454',
            date: new Date('2022-12-12'),
            fullPath: 'files/downloads/various.mp3',
        },
        {
            name: 'something.docx',
            type: 'Microsoft Word 2007-2013 Document',
            size: '1235845658',
            date: new Date('2022-12-12'),
            fullPath: 'files/downloads/something.docx',
        },
    ],
    'files/music': [
        {
            name: 'various.mp3',
            type: 'audio/mp3',
            size: '3265985452214',
            date: new Date('2022-12-12'),
            fullPath: 'files/music/various.mp3',
        },
        {
            name: 'something.mp3',
            type: 'audio/mp3',
            size: '1235845658',
            date: new Date('2022-12-12'),
            fullPath: 'files/music/something.mp3',
        },
    ],
    'files/videos': [
        {
            name: 'various.mp4',
            type: 'video/mp4',
            size: '1655656456656535',
            date: new Date('2022-12-12'),
            fullPath: 'files/videos/various.mp4',
        },
        {
            name: 'late.mp4',
            type: 'video/mp4',
            size: '554345648465464646',
            date: new Date('2022-12-12'),
            fullPath: 'files/videos/late.mp4',
        },
    ],
    'recovery': [],
    'system': [
        {
            name: 'drivers',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers',
        },
        {
            name: 'objects',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/objects',
        },
        {
            name: 'lib',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib',
        },
        {
            name: 'registry.dat',
            type: '.dat file',
            size: '254655548',
            date: new Date('2022-12-12'),
            fullPath: 'system/registry.dat',
        },
    ],
    'system/drivers': [
        {
            name: 'etc',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/etc',
        },
        {
            name: 'cache',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/cache',
        },
        {
            name: 'network',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/network',
        },
        {
            name: 'modules',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/modules',
        },
        {
            name: 'config.cat',
            type: '.cat file',
            size: '23566888',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/config.cat',
        },
    ],
    'system/lib': [
        {
            name: 'fs.so',
            type: 'Shared Object',
            size: '2556666888',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/fs.so',
        },
        {
            name: 'ext4.so',
            type: 'Shared Object',
            size: '2225555558',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/ext4.so',
        },
        {
            name: 'ntfs.so',
            type: 'Shared Object',
            size: '3333665555',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/ntfs.so',
        },
        {
            name: 'fat.so',
            type: 'Shared Object',
            size: '1233355555',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/fat.so',
        },
        {
            name: 'io.so',
            type: 'Shared Object',
            size: '222336666558',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/io.so',
        },
        {
            name: 'network.so',
            type: 'Shared Object',
            size: '42115555558',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/io.so',
        },
        {
            name: 'display.so',
            type: 'Shared Object',
            size: '115555558',
            date: new Date('2022-12-12'),
            fullPath: 'system/lib/display.so',
        },
    ],
    'system/objects': [
        {
            name: 'boot.img',
            type: 'Disk image',
            size: '42115555558',
            date: new Date('2022-12-12'),
            fullPath: 'system/objects/boot.img',
        },
        {
            name: 'grub.img',
            type: 'Disk image',
            size: '1323155533',
            date: new Date('2022-12-12'),
            fullPath: 'system/objects/grub.img',
        },
        {
            name: 'shadow',
            type: 'file',
            size: '125555',
            date: new Date('2022-12-12'),
            fullPath: 'system/objects/shadow',
        },
    ],
    'system/drivers/etc': [
        {
            name: 'hosts',
            type: 'file',
            size: '720',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/etc',
        },
    ],
    'system/drivers/cache': [
        {
            name: 'internal',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/cache/internal',
        },
        {
            name: 'third-party',
            type: 'dir',
            size: 'N/A',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/cache/third-party',
        },
    ],
    'system/drivers/network': [
        {
            name: 'loopback',
            type: 'file',
            size: '0',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/network/loopback',
        },
        {
            name: 'wlps01',
            type: 'file',
            size: '24',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/network/wlps01',
        },
    ],
    'system/drivers/modules': [
        {
            name: 'display.so',
            type: 'Shared Object',
            size: '33325566988',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/modules/display.so',
        },
        {
            name: 'x.so',
            type: 'Shared Object',
            size: '2253556',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/modules/x.so',
        },
        {
            name: 'terminal.so',
            type: 'Shared Object',
            size: '11445558',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/modules/terminal.so',
        },
    ],
    'system/drivers/cache/internal': [
        {
            name: '34343222-455b-33fe-332344444c-112222234',
            type: 'file',
            size: '225554745558',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/modules/cache/internal/34343222-455b-33fe-332344444c-112222234',
        },

    ],
    'system/drivers/cache/third-party': [
        {
            name: '34343222-455b-33fe-332344444c-112222235',
            type: 'file',
            size: '10',
            date: new Date('2022-12-12'),
            fullPath: 'system/drivers/cache/third-party/34343222-455b-33fe-332344444c-112222235',
        },
    ],
    'users': [
        {
            name: '34343222-455b-33fe-332344444c-225655587',
            type: 'file',
            size: '0',
            date: new Date('2022-12-12'),
            fullPath: 'users/34343222-455b-33fe-332344444c-225655587'
        },
        {
            name: '34343222-455b-33fe-332344444c-225655583',
            type: 'file',
            size: '0',
            date: new Date('2022-12-12'),
            fullPath: 'users/34343222-455b-33fe-332344444c-225655583'
        },
        {
            name: '34343222-455b-33fe-332344444c-3357777887',
            type: 'file',
            size: '0',
            date: new Date('2022-12-12'),
            fullPath: 'users/34343222-455b-33fe-332344444c-3357777887'
        },
    ],
}

const customSizeRender = (column, value, item) => {
    const levels = ['B', 'kiB', 'MiB', 'GiB', 'TiB'];
    let unit = 'B';
    let order = value;
    let text = order + ' ' + unit
    for (let level in levels) {
        const v = order / 1024;
        if (v >= 1) {
            order = v;
            unit = levels[level];
            text = order.toFixed(2) + ' ' + unit;
        }
    }

    column.columnElement.innerText = text;
}

const customDateRender = (column, value, item) => {
    column.columnElement.innerText = value.toLocaleTimeString("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).replace(',', '');
}

const DemoFileRepository = class {
    getByDir(dirname, forView = 'list') {
        if (dirname === '') {
            dirname = '///root///'
        }
        if (forView === 'list') {
           return this.map(files[dirname]);
        } else {
            return files[dirname];
        }
    }

    map(data) {
        return data.map(d => {
            return {
                columns: [
                    {
                        columnId: 'name',
                        value: d.name,
                    },
                    {
                        columnId: 'type',
                        value: d.type,
                    },
                    {
                        columnId: 'size',
                        value: d.size,
                        customRender: customSizeRender
                    },
                    {
                        columnId: 'date',
                        value: d.date,
                        customRender: customDateRender
                    },
                ],
                fullPath: d.fullPath,
            }
        })
    }
}

export default DemoFileRepository;