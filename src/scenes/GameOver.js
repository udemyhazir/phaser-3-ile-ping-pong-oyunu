

import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene{

    create(data){

        //console.log(data);

        let yazi="Kaybettiniz"
        
        if(data.oyuncuSkor>data.pcSkor){
            yazi="Kazandınız"
        }

        this.add.text(400,200,yazi,{
            fontFamily:'"Press Start 2P"',
            fontSize:40
        }).setOrigin(0.5,0.5)

        let devamYazi="Devam etmek için SPACE tuşuna basınız"

        this.add.text(400,300,devamYazi,{
            fontFamily:'"Press Start 2P"',
            fontSize:20
        }).setOrigin(0.5,0.5)

        this.input.keyboard.once('keydown-SPACE',()=>{
            this.scene.start('game')
        })

    }
}