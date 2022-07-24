export default class Gameplay extends Phaser.Scene {
    constructor() {
        super({ key: 'Gameplay' });
    }
    create() {
        this.sqr1 = this.add.sprite(300, 240, 'blue').setOrigin(0.5, 0.5).setInteractive();
        this.sqr2 = this.add.sprite(300, 460, 'green').setOrigin(0.5, 0.5).setInteractive();
        this.sqr3 = this.add.sprite(520, 460, 'red').setOrigin(0.5, 0.5).setInteractive();
        this.sqr4 = this.add.sprite(520, 240, 'yellow').setOrigin(0.5, 0.5).setInteractive();

        // this.stage.backgroundColor = "#ffffff";

        this.start = this.add.sprite(820, 240, 'start').setOrigin(0.5, 0.5).setInteractive().setScale(0.6);
        this.submit = this.add.sprite(820, 440, 'submit').setOrigin(0.5, 0.5).setInteractive().setScale(0.6);
        this.gameover = this.add.sprite(640, 360, 'GameOver').setOrigin(0.5, 0.5).setScale(2);
        this.gameover.visible = false;
        this.tileArray = [this.sqr1, this.sqr2, this.sqr3, this.sqr4];
        this.userArr = [];
        this.randomArr = [];
        this.randomTileArr = [];
        this.canClick = true;
        this.sqr1.imgId = 0;
        this.sqr2.imgId = 1;
        this.sqr3.imgId = 2;
        this.sqr4.imgId = 3;



        this.sqr1.on('pointerdown', this.onColorClick.bind(this, this.sqr1));
        this.sqr2.on('pointerdown', this.onColorClick.bind(this, this.sqr2));
        this.sqr3.on('pointerdown', this.onColorClick.bind(this, this.sqr3));
        this.sqr4.on('pointerdown', this.onColorClick.bind(this, this.sqr4));


        this.submit.on('pointerdown', () => {
            if (!this.canClick) { return; }
            this.compareArrays();
        });

        this.start.on('pointerdown', () => {
            if (!this.canClick) { return; }
            this.choseRandomTile();
        });
    }

    onColorClick(sprite, pointer, localX, localY, event) {
        if (!this.canClick) {
            console.log("canClick false");
            return;
        }
        this.tweeen(sprite);
        this.clickedTile(sprite.imgId);
    }

    clickedTile(id) {
        this.userArr.push(id);
        // console.log("user array " + this.userArr);
    }

    compareArrays() {
        // console.log("compareArrays()");
        let bool;
        for (let i = 0; i < this.userArr.length; i++) {
            bool = false;
            if (this.userArr[i] === this.randomArr[i]) {
                bool = true;
            } else {
                console.log("GAME OVER!");
                this.gameover.visible = true;
                this.canClick = false;
                return;
            }
        }
        if (bool) {
            this.choseRandomTile();
        }
        return bool;
    }

    gameOver() {
        this.tweens.add({
            targets: this.gameover,
            ease: 'Power2',
            duration: 200,
            delay: 200 * i,
            scale: { from: 1 },
            alpha: { start: 0, to: 1 },
            onStart: () => { '' }
        });

    }
    choseRandomTile() {
        // console.log("choseRandomTile()");
        let randomIndex = Math.floor(Math.random() * this.tileArray.length);
        this.randomArr.push(randomIndex);
        this.randomTileArr.push(this.tileArray[randomIndex]);

        // console.log(this.randomArr);
        this.userArr = [];
        for (let i = 0; i < this.randomTileArr.length; i++) {
            var timer = this.time.delayedCall(450 * i, this.tweeen, [this.randomTileArr[i]], this);
        }
    }
    tweeen(tile) {
        this.canClick = false;
        // console.log("tween()", tile);
        this.tweens.add({
            targets: tile,
            ease: 'Linear',
            duration: 100,
            scale: {
                from: 1,
                to: 0.5
            },
            yoyo: true,
            // scaleY: {
            //     from: 1,
            //     to: 0.5
            // },
            onComplete: () => {

                this.canClick = true;
            }
        });
    }
}