import { Typography, Box } from "@mui/material";
import React from "react";
import './Team.scss';

const Team = () => {
    const teamMembers = [
        {
            name: 'Petya Marinova',
            linkedin: "https://www.linkedin.com/in/pmmarinova/",
            github: "https://github.com/petya0111",
            imgsrc: "https://avatars.githubusercontent.com/u/13080328?v=4"
        },
        {
            name: 'Nikolay Nikolaev',
            linkedin: "https://www.linkedin.com/in//",
            github: "https://github.com/NikolayNikolaev1",
            imgsrc: "https://i.pinimg.com/474x/3c/6c/cb/3c6ccb83716d1e4fb91d3082f6b21d77.jpg"
        },
        {
            name: 'Niazi Yazadzhiev',
            linkedin: "https://www.linkedin.com/in/niazi-yazadzhiev-942a6421b",
            github: "https://github.com/nyazadzhiev",
            imgsrc: "https://media-exp2.licdn.com/dms/image/D4E03AQGD2RkICOrGsg/profile-displayphoto-shrink_400_400/0/1631128288158?e=1661990400&v=beta&t=dBMgDLBTNi4n4X-HLbsalPajbtaiYwO21AwMgyM_huM"
        },
        {
            name: 'Filip Bozhkov',
            linkedin: "https://www.linkedin.com/in/filip-bozhkov-27b4361b7/",
            github: "https://github.com/fbozhkov",
            imgsrc: "https://avatars.githubusercontent.com/u/52756776?v=4"
        }
    ]
    return (
        <Box className="body">
            <Box className="banner">
                <Typography className="text" variant="h2">
                    Team
                </Typography>

                <div class="card-container">
                    {
                        teamMembers.map(item => {
                            return <div className="card">
                                <img src={item.imgsrc} alt="Image" className='memberImage' />
                                <h1 className="name">{item.name}</h1>
                                <h3 className="positon">DeFi Developer</h3>
                                <div className="memberInfo">
                                    <a href={item.linkedin} target="_blank">
                                        <img src="https://thumbs.dreamstime.com/b/linkedin-icon-filled-website-design-mobile-app-development-social-collection-isolated-black-background-155363702.jpg"
                                            alt="image" className="social-image" />
                                    </a>
                                    <a href={item.github} target="_blank">
                                        <img src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU" 
                                        alt="Image" className='social-image' />
                                    </a>
                                </div>

                            </div>
                        })
                    }
                </div>
            </Box>

        </Box>

    );
}

export default Team