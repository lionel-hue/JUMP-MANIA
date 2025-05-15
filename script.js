class Sprite {
    constructor({imgSrc,pos,vel,width,height,scale,framesMax,dynamic,extraGap,collider,sprites}){
      
      this.img = new Image()
      this.img.src = imgSrc
      this.pos = pos
      this.vel = vel
      this.width= width
      this.height=height
      this.scale = scale
      this.framesMax= framesMax
      this.framesCurrent=0
      this.framesElasped= 0
      this.framesHold = 3
      this.dynamic=dynamic
      this.extraGap=extraGap
      this.collider=collider
      this.sprites=sprites
        
    }
     draw(){
      if (this.dynamic==true){
         ctx.drawImage(
           this.img,
           this.framesCurrent*(this.img.width/this.framesMax),
           0,
           this.img.width/this.framesMax,
           this.img.height,
           this.pos.x,
           this.pos.y,
           (this.img.width/this.framesMax)*this.scale,
           (this.img.height)*this.scale)
           ctx.fillStyle='rgba(0,0,0,0)'
           ctx.fillRect(
             this.collider.x,
             this.collider.y,
             this.collider.width,
             this.collider.height)
       }
       else if(this.dynamic==false){
         ctx.drawImage(
           this.img,
           this.pos.x,
           this.pos.y,
           this.width,
           this.height)
       }
       
         for(const  sprite in this.sprites){
    this.sprites[sprite].image = new Image()
    this.sprites[sprite].image.src= this. sprites[sprite].imgSrc
     
     }
     
     }
     
     update(){
       this.draw()
      this.framesElasped++
      
     if(this.framesElasped % this.framesHold===0){
   if(this.framesCurrent<this.framesMax-1){
       this.framesCurrent++
   } else this.framesCurrent =0
       }
        // Jump Initiation
       this.pos.y +=this.vel.y
       this.collider.x +=this.vel.x
       this.collider.y +=this.vel.y
       
      if(this.pos.y+this.vel.y+this.img.height-this.extraGap >= theGround){
        this.vel.y = 0
        this.img.src = 'https://i.ibb.co/4tcF8Qm/Run.png'
        switchSprites()
        pressed = 0
      }  
      else this.vel.y +=gravity
 
     
     }
  }
  
  
    class Obstacles extends Sprite{
      constructor({imgSrc,pos,vel,scale,framesMax,extraGap,dynamic,collider}){
        
          super({imgSrc,pos,vel,scale,framesMax,extraGap,dynamic,collider})
          this.framesCurrent=0
          this.framesElasped=0
          this.framesHold=6
      }
        
        UPDATE(){
           this.draw()
           
           this.framesElasped++
        if(this.framesElasped%this.framesHold===0){
         if(this.framesCurrent<this.framesMax-1){
           this.framesCurrent++
         } else this.framesCurrent=0
        }
          this.pos.x += this.vel.x
          
          this.collider.x +=this.vel.x
          this.collider.y +=this.vel.y
        }
        
  }
  
   
   class PowerUps extends Sprite{
      constructor({imgSrc,pos,vel,scale,framesMax,extraGap,dynamic,collider}){
        
          super({imgSrc,pos,vel,scale,framesMax,extraGap,dynamic,collider})
          this.framesCurrent=0
          this.framesElasped=0
          this.framesHold=6
      }
        
        Update(){
           this.draw()
           
           this.framesElasped++
        if(this.framesElasped%this.framesHold===0){
         if(this.framesCurrent<this.framesMax-1){
           this.framesCurrent++
         } else this.framesCurrent=0
        }
          this.pos.x += this.vel.x
          
          this.collider.x +=this.vel.x
          this.collider.y +=this.vel.y
        }
        
  }

  const InnerWidth =innerWidth,
        InnerHeight=innerHeight, 
        theGround=InnerHeight-(InnerHeight/2.26050420168)
        gravity= InnerHeight/384.28571428571
        
 let    animateId,
        pressed,
        clickable,
        health,
        addingScore,
        hasTakenHit,
        shouldRemoveHP,
        hasEatenHP,
        shouldAddHP,
        deleteHP,
        obstacles = [],
        powerups  = []
        
  const gameMusic = new Audio(),
        iAmHItMusic = new Audio(),
        gameOverMusic = new Audio()
 
        
        gameMusic.src = 'https://www.dropbox.com/s/60sokfk3t9fcj5k/echoes-free-introoutro-music-prod-urbn-beats-8896.mp3?dl=1'
        
        iAmHItMusic.src = 'https://www.dropbox.com/s/anc2v40rkkkt3d9/ugh.mp3?dl=1'
        
        gameOverMusic.src = 'https://www.dropbox.com/s/v5xznfm21zhaz6l/sfx-defeat2.mp3?dl=1'
 
   const backGround = new Sprite({
       imgSrc:'https://i.ibb.co/9GGDvRv/20220415-165208.png',
        pos:{
          x:0,
          y:0
        },
        vel:{
          x:0,
          y:0
        },
        width:InnerWidth,
        height:InnerHeight+(InnerHeight/1.29),
         scale:undefined,
         framesMax:undefined,
         dynamic:false,
         sprites:undefined
     })
 
     
  const runner = new Sprite({
        imgSrc :'https://i.ibb.co/4tcF8Qm/Run.png',
        pos:{
            x:InnerWidth/38.75,
            y: theGround
        },
        vel:{
          x:0,
          y:0
        },
        scale:2,
        framesMax:8,
        dynamic:true,
        extraGap:InnerHeight/3.53947368421,
        
        collider: {
              x :InnerWidth/8.61111111111,
              y :InnerHeight/1.28095238095,
              width:InnerWidth/38.75,
              height:InnerHeight/6.725
              
        },
         
        sprites:{
          jump : {
            imgSrc :'https://i.ibb.co/VNKcKjP/Jump.png',
         framesMax : 2
          },
          run:{
            imgSrc :'https://i.ibb.co/4tcF8Qm/Run.png',
            framesMax :8
         }
        }
       }) 
       
       function switchSprites(){
         switch (runner.img.src) {
               case 'https://i.ibb.co/VNKcKjP/Jump.png':
           //Jump
           runner.scale = 0.74
           runner.framesMax = 2
           runner.extraGap = InnerHeight/1.29951690821
                 break
               case 'https://i.ibb.co/4tcF8Qm/Run.png':
           //run
           runner.scale = 2
           runner.framesMax = 8  
           runner.extraGap = InnerHeight/3.53947368421
                 break
               
               default:
                 // code
             }   
       }
         
  const  spawnObstacles = ()=>{
           setInterval(()=>{
       const rock= new Obstacles({
           
        imgSrc : 'https://i.ibb.co/wpfYr7h/rock-3.png',
            pos :{
               x:InnerWidth+InnerWidth/15.5, 
               y: InnerHeight-InnerHeight/7.47222222222
            },
            vel:{
               x:-InnerWidth/155,
               y:0
            },
            scale:1,
            framesMax:1,
            extraGap:InnerHeight/4.483333333333,
            dynamic:true,
            
            collider: {
              x :InnerWidth/0.9359903382,
              y : InnerHeight/1.15948275862,
              width:InnerWidth/17.22222222222,
              height:InnerHeight/14.944444444
        }
         })
        obstacles.push(rock)
           },3000) 
           setInterval(()=>{
       const lamp= new Obstacles({
           
        imgSrc : 'https://i.ibb.co/0ySPrTN/lamp.png',
            pos :{
               x:InnerWidth+(InnerWidth/15.5), 
               y: InnerHeight-(InnerHeight/3.448717949)
            },
            vel:{
               x:-InnerWidth/155,
               y:0
            },
            scale:1,
            framesMax:1,
            extraGap:InnerHeight/4.48333333333,
            dynamic:true,
            
            collider: {
              x :InnerWidth/0.9348612786,
              y :InnerHeight/1.393782383,
              width:InnerWidth/38.75,
              height:InnerHeight/4.890909091
            }
         })
        obstacles.push(lamp)
           },10000)
           setInterval(()=>{
       const building = new Obstacles({
           
        imgSrc : 'https://i.ibb.co/xqvHwHC/shop-anim.png',
            pos :{
               x:InnerWidth+(InnerWidth/3.875), 
               y: InnerHeight-(InnerHeight/1.37244898)
            },
            vel:{
               x:-InnerWidth/155,
               y:0
            },
            scale:1.53,
            framesMax:6,
            extraGap:InnerHeight/4.4833333,
            dynamic:true,
            
            collider: {
              x :InnerWidth/.7908163265,
              y :InnerHeight/2.24166666667,
              width:InnerWidth/5.166666667,
              height:InnerHeight/2.053435115
            }
         })
        obstacles.push(building)
           },20000)
         }
         
         
         const spwanPowerups = ()=>{
         setTimeout( ()=>{
           setInterval(()=>{
     const lifePowerUp = new PowerUps({
                imgSrc:'https://i.ibb.co/hmSk03d/1650388043468.png',
                pos:{
                  x :InnerWidth+InnerWidth/55.35714286,
                  y :InnerHeight/5.38
                },
                vel:{
                  x:-InnerWidth/155,
                  y:0
                },
                scale:0.0625,
                framesMax:1,
                extraGap:InnerHeight/4.483333333333,
                dynamic:true,
                
                collider:{
                  x:InnerWidth/0.96875,
                  y:InnerHeight/4.559322034,
                  width:InnerWidth/41.891891891,
                  height:InnerHeight/14.540540540540
                }
                
           })
          powerups.push(lifePowerUp)
           },18000)
           },40000)
         }
         
     let n = 0
       const Score = ()=>{
              n +=10
             document.querySelector("#score").innerHTML= n
      addingScore = setTimeout(Score, 1000);
       }
   
       
        JUMP = ()=>{      
      if(clickable){ 
    addEventListener('touchstart',()=>{
            pressed += 1
        if(pressed <=3){
        runner.vel.y = -10
          runner.img = runner.sprites.jump.image
          switchSprites()
        } else clickable = 0
        })
      }
        }
       
        
        checkingMyLife=()=>{
          
       setInterval( ()=>{   
      if(shouldRemoveHP){
        health -= 10
     document.querySelector('#player_health').style.width=     health + "%"
        shouldRemoveHP = 0 
      if(health >=50){
       document.querySelector('#player_health').style.background='lightGreen'
      }
      
    else  if(health < 49 && health > 29){
          document.querySelector('#player_health').style.background='orange'
       }
      
    else  if(health <= 29 && health >0){
          document.querySelector('#player_health').style.background='red'
       }
       else if(health <=0){
      cancelAnimationFrame(animateId)
      clearTimeout(addingScore)
      document.querySelector('#score').innerHTML = 'Score : ' + n
      document.querySelector('#gameOver').style.display = 'flex'
           gameOverMusic.play()
        document.querySelector('#gameOver').onclick=()=>{
       location.reload(false) 
         }
       }
     }
    },1700)
  }
        
        addingMyLife=()=>{
          
      setInterval( ()=>{
            if(shouldAddHP){
              shouldAddHP =0 //😚😚
     if(health < 100)
      {     health+=10
            deleteHP=1
      }
     document.querySelector('#player_health').style.width=     health + "%"
            }
          },1700)
        }
     
  loadedGame=()=>{
    
       document.querySelector('#startPic').style.display= 'block'
       document.querySelector('#help').style.display = 'block'
       document.querySelector('#start').style.display = 'flex'
    
      const canvas= document.querySelector('canvas')
         canvas.width = InnerWidth
         canvas.height= InnerHeight
      ctx = canvas.getContext('2d')
    
    
           function animate(){
     animateId = requestAnimationFrame(animate)
           ctx.fillRect(0,0,InnerWidth,InnerHeight)
           backGround.draw()
            runner.update()
        obstacles.forEach((obstacle)=>{
           obstacle.UPDATE()
       if(
        runner.collider.x + runner.collider.width>= obstacle.collider.x && runner.collider.x <=obstacle.collider.x+obstacle.collider.width && runner.collider.y + runner.collider.height>= obstacle.collider.y && runner.collider.y <=obstacle.collider.y+obstacle.collider.width ){
            iAmHItMusic.play()
             hasTakenHit = true
             if(hasTakenHit){
           shouldRemoveHP = true
               hasTakenHit = false
             }
         
       }
         })
         
        powerups.forEach((powerup)=>{
            powerup.Update()
        if(runner.collider.x + runner.collider.width>= powerup.collider.x && runner.collider.x <=powerup.collider.x+powerup.collider.width && runner.collider.y + runner.collider.height>= powerup.collider.y && runner.collider.y <=powerup.collider.y+powerup.collider.width){
               hasEatenHP = true
            if(hasEatenHP){
              shouldAddHP=true
              hasEatenHP = false
            }
            setInterval(()=>{
              if(deleteHP){
              powerup.scale = 0
              }
            },1)
        }
        })
           }
     
        
 
           //run game...
     document.querySelector('#start').onclick=()=>{
        n = 0
        obstacles = [],
        powerups = [],
        pressed = 0,
        clickable= true,
        health = 100
        hasTakenHit=false,
        shouldRemoveHP=false,
        hasEatenHP= false,
        shouldAddHP=false,
        deleteHP = 0
  
           animate()  
           spawnObstacles()
           spwanPowerups()
           Score()
           JUMP()
           checkingMyLife()
           addingMyLife()
           gameMusic.play()
           setTimeout(()=>{
             gameMusic.pause()},15800)
           
      document.querySelector('#player_info').style.display='flex'
 
         for(let i=0;i<4;i++){
    document.querySelectorAll('#start,#title,#help,#startPic')[i].style.display='none'
         }
     }
     
     document.getElementById('help').onclick=()=>{
      document.querySelector('#help_page').style.display='none'
      document.querySelector('#help_page').style.display='block'
     }
     document.querySelector('#help_page .cancel').onclick=()=>{
       document.querySelector('#help_page').style.display='none'
     }
  } 
  
       
  
      if(InnerWidth >= InnerHeight){
           window.addEventListener('load',loadedGame)
         }
          else {
       alert('This game runs correctly in landscape mode,auto rotate your device and try again😊')
          }