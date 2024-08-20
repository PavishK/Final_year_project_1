import React from 'react'
import DataScience from './datascience.jpg';
import MobileApp from './mobilepapp.jpg';
import Selenium from './selinium.jpg';
import Hacking from './ethicalhacking.png';
import FSPy from './fullstackpy.png';
import FSJava from './fullstackjava.png';
import FSPhp from './fullstackphp.jpg';
import FullStack from './fullstack.jpg';
import Devops from './devops.jpg';
import DigitalM from './digitalm.jpg';
import Blockchain from './blockchain.jpg';


const DSHandler=()=>{
    window.alert("1"); 
}

const MADHandler=()=>{
    window.alert("2");
}
const SHandler=()=>{
    window.alert("3");
}
const HHandler=()=>{
    window.alert("4");
}
const FSPHandler=()=>{
    window.alert("5");
}
const FSJHandler=()=>{
    window.alert("6");
}
const FSPHPHandler=()=>{
    window.alert("7");
}
const FSDHandler=()=>{
    window.alert("8");
}
const DTHandler=()=>{
    window.alert("9");
}
const DMTHandler=()=>{
    window.alert("10");
}
const BTHandler=()=>{
    window.alert("11");
}


const CourseList =[
        {id:1,src:DataScience,name:`Data Science With Python`,cost:"500/month",enrolled:0,desc:"Transform data into insights and boost your career with Python Data Science.",btn:DSHandler},
        {id:2,src:MobileApp,name:`Mobile App Development`,cost:"500/month",enrolled:0,desc:"Build innovative and powerful Android apps to transform your ideas into reality.",btn:MADHandler},
        {id:3,src:Selenium,name:`Selenium Testing With Java`,cost:"500/month",enrolled:0,desc:"Automate testing and enhance software quality with Selenium and Java.",btn:SHandler},
        {id:4,src:Hacking,name:`Ethical Hacking`,cost:"500/month",enrolled:0,desc:"Become an Ethical Hacker: Protect systems and data with advanced cybersecurity skills.",btn:HHandler},
        {id:5,src:FSPy,name:`Full Stack Python`,cost:"500/month",enrolled:0,desc:"Build dynamic web applications from front to back with Full Stack Python Development.",btn:FSPHandler},
        {id:6,src:FSJava,name:`Full Stack Java`,cost:"500/month",enrolled:0,desc:"Develop robust, scalable web applications end-to-end with Full Stack Java Development.",btn:FSJHandler},
        {id:7,src:FSPhp,name:`Full Stack PHP`,cost:"500/month",enrolled:0,desc:"Build dynamic, end-to-end web applications with Full Stack PHP development.",btn:FSPHPHandler},
        {id:8,src:FullStack,name:`Full Stack Development`,cost:"500/month",enrolled:0,desc:"Build complete, dynamic web solutions from start to finish with Full Stack Development.",btn:FSDHandler},
        {id:9,src:Devops,name:`Devops Training`,cost:"500/month",enrolled:0,desc:"Streamline your workflow and boost efficiency with comprehensive DevOps training.",btn:DTHandler},
        {id:10,src:DigitalM,name:`Digital Marketing`,cost:"500/month",enrolled:0,desc:"Enhance your skills and drive success with our comprehensive Digital Marketing Training.",btn:DMTHandler},
        {id:11,src:Blockchain,name:`Blockchain Training`,cost:"500/month",enrolled:0,desc:"Unlock the potential of decentralized technology with expert Blockchain training.",btn:BTHandler},
    ]
export default CourseList;