import Phaser from 'phaser'

export default class GameBackground extends Phaser.Scene{

    preload(){}

    create(){

        const renk=0xffffff;

        this.add.line(400,250,0,0,0,500,renk,1).setLineWidth(2.5,2.5)

        this.add.circle(400,250,50).setStrokeStyle(5,renk,1)

    }
}