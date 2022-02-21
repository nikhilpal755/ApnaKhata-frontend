import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Grid} from '@mui/material'
import './card.css'

export default function CustomCard({desc, val, icon}) {
   
  return (
      <>
       <div className="card">
        <Grid item style={{padding: '20px'}}>
             <div className="cardContent">

                  <Card sx={{ minWidth: 300 }}>
                    <CardActionArea>
                
                      <CardContent >
                        <Typography gutterBottom variant="h5" component="div" style={{display: "flex", justifyContent: 'space-between'}}>
                            <div className='value'>
                                 {val}
                            </div>
                            <div className="icon">
                                {icon}
                            </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                </Card>
             </div>
        </Grid>
       </div>
      </>
  )
}
