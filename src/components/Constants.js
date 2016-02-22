export default {
    Units: {
        DefaultPositions: [
            {
                region: 'FR',
                units: [{type: 'Infantry', number: 3, owner: 'FR'}]
            },
            {
                region: 'DE',
                units: [{type: 'Tank', number: 5, owner: 'DE'}]
            }
        ],
        Infantry: {
            width: 20,
            height: 40,
            attack: 1,
            defend: 2,
            move: 1,
            cost: 3,
            imgPath: './res/svg/usinfantry.svg'
        },
        Tank: {
            width: 30,
            height: 30,
            attack: 3,
            defend: 3,
            move: 2,
            cost: 5,
            imgPath: './res/svg/tank.svg'
        }
    }
}