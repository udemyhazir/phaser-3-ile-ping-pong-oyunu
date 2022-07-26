

import Phaser from 'phaser'
import WebFontFile from './WebFontFile'

const OyunDurumlar={
    oynaniyor:'oynaniyor',
    pcKazandi:'pc-kazandi',
    oyuncuKazandi:'oyuncu-kazandi'
}

class Game extends Phaser.Scene{

    preload(){

        this.load.addFile(new WebFontFile(this.load,'Press Start 2P'))

        this.load.audio('pong-beeep','assets/beeep.ogg')
        this.load.audio('pong-plop','assets/plop.ogg')

    }

    init(){
        this.sagOyuncuHiz=new Phaser.Math.Vector2(0,0)
       
        this.solOyuncuSkor=0
        this.sagOyuncuSkor=0

        this.gameState=OyunDurumlar.oynaniyor
        this.paused=false
    }

    create(){

        this.scene.run('game-background')

        const skorStyle={
            fontSize:48,
            fontFamily:'"Press Start 2P"'
        }
        
        this.solSkorLabel=this.add.text(300,125,this.solOyuncuSkor,skorStyle).setOrigin(0.5,0.5)
        this.sagSkorLabel=this.add.text(500,375,this.sagOyuncuSkor,skorStyle).setOrigin(0.5,0.5)


        this.top=this.add.circle(400,250,10,0xffffff,1);
        this.physics.add.existing(this.top)

        this.top.body.setCollideWorldBounds(true,1,1)

        this.solOyuncu=this.add.rectangle(50,250,20,100,0xffffff,1)
        this.physics.add.existing(this.solOyuncu,true)
        this.physics.add.collider(this.solOyuncu,this.top,this.topBariyerCarpismasi,undefined,this);

        this.sagOyuncu=this.add.rectangle(750,250,20,100,0xffffff,1)
        this.physics.add.existing(this.sagOyuncu,true)
        this.physics.add.collider(this.sagOyuncu,this.top,this.topBariyerCarpismasi,undefined,this);

        

        this.top.body.setBounce(1,1);

        this.klavye=this.input.keyboard.createCursorKeys()

        this.physics.world.setBounds(-100,0,1000,500)

        this.resetTop()

        this.top.body.onWorldBounds=true

        this.physics.world.on('worldbounds',this.topDunyaCarpismasi,this)

    }


    topBariyerCarpismasi(){

        this.sound.play('pong-beeep')
    }


    topDunyaCarpismasi(body,up,down,left,right){

        if(left || right){
            return;
        }

        this.sound.play('pong-plop')

    }

    resetTop(){

       
        this.top.setPosition(400,250)
        const aci=Phaser.Math.Between(0,360);
        const vec=this.physics.velocityFromAngle(aci,500);

        this.top.body.setVelocity(vec.x,vec.y)
        

    }


    skorDegistir(taraf){
        if(taraf=='sol'){
            this.solOyuncuSkor+=1
            this.solSkorLabel.text=this.solOyuncuSkor
        }else{
            this.sagOyuncuSkor+=1
            this.sagSkorLabel.text=this.sagOyuncuSkor
        }
    }



    



    update(){

        if(this.paused || this.gameState!==OyunDurumlar.oynaniyor){
            return ;
        }

        const pcHiz=3


        if(this.klavye.up.isDown){
           
            this.solOyuncu.y-=10;

        }else if(this.klavye.down.isDown){
            this.solOyuncu.y+=10;
        }

       

        this.solOyuncu.body.updateFromGameObject()

        const fark=this.top.y-this.sagOyuncu.y
        //console.log(fark);

        if(fark<0){
            this.sagOyuncuHiz.y=-pcHiz
            if(this.sagOyuncuHiz.y<-10){
                this.sagOyuncuHiz.y=-10
            }

        }else if(fark>0){
            this.sagOyuncuHiz.y=pcHiz
            if(this.sagOyuncuHiz.y>10){
                this.sagOyuncuHiz.y=10
            }
        }

        this.sagOyuncu.y += this.sagOyuncuHiz.y
        this.sagOyuncu.body.updateFromGameObject()

        
        

        if(this.top.x<-30){
           
            this.resetTop()
            this.skorDegistir('sag')
        }else if(this.top.x>830){
            this.resetTop()
            this.skorDegistir('sol')
        }


        const maxSkor=1

        if(this.solOyuncuSkor>=maxSkor){
           // console.log('sol oyuncu kazandı');
           this.gameState=OyunDurumlar.oyuncuKazandi
        }else if(this.sagOyuncuSkor>=maxSkor){
            //console.log('sağ oyuncu kazandı');
            this.gameState=OyunDurumlar.pcKazandi
        }

        if(this.gameState!=OyunDurumlar.oynaniyor){

            this.top.active=false
            this.physics.world.remove(this.top.body)

            this.scene.stop('game-background')
            this.scene.start('game-over',{
                oyuncuSkor:this.solOyuncuSkor,
                pcSkor:this.sagOyuncuSkor
            })

            
        }



    }
}

export default Game