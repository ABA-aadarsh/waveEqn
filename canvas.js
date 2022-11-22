const canvas=document.querySelector("canvas")
const controlls=[...document.querySelectorAll(".controllers")]
const init=()=>{
    const amplitude=document.querySelector("#a")
    const timePeriod=document.querySelector("#T")
    const wavelength=document.querySelector("#l")
    amplitude.value=25
    timePeriod.value=6
    wavelength.value=100
}
const WIDTH=1024
const HEIGHT=576
canvas.width=WIDTH
canvas.height=HEIGHT
const c=canvas.getContext("2d")
const wave={
    a:25,
    T:6,   //seconds
    l:100,  //pixels
    time:0
}
wave.w=(2*Math.PI)/wave.T
wave.k=(2*Math.PI)/wave.l
class Particle{
    constructor({position,radius}){
        this.position=position
        this.radius=radius
    }
    updatePosition(){
        wave.w=(2*Math.PI)/wave.T
        wave.k=(2*Math.PI)/wave.l
        this.position.y=HEIGHT/2 +( wave.a*Math.sin( (wave.w*wave.time) + (wave.k*this.position.x) ) )
        // this.position.y=HEIGHT/2 +( 2*wave.a*Math.sin(wave.w*wave.time)*Math.cos(wave.k*this.position.x) )
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.stroke();
        c.fill()
    }
}
const createParticles=(n)=>{
    const particles=[]
    for(let i=0;i<n;i++){
        const p=new Particle({
            position:{
                x: (i-1)*10+200,
                y:HEIGHT/2
            },
            radius:5
        })
        particles.push(p)
    }
    return particles
}
const particles=createParticles(60)
init()
const animate=setInterval(()=>{
    c.clearRect(0,0,WIDTH,HEIGHT)
    c.fillStyle="white"
    c.fillRect(0,0,WIDTH,HEIGHT)
    particles.forEach((particle,index)=>{
        c.fillStyle="blue"
        if(index==30){
            c.fillStyle="black"
        }
        particle.draw()
        particle.updatePosition()
    })
    wave.time+=0.1
},100)
controlls.forEach((c)=>{
    c.addEventListener("change",()=>{
        const value=c.value
        wave[c.id]=value
    })
})
