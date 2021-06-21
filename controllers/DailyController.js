
const mongoose = require('mongoose');
const { time } = require('cron');
mongoose.connect('mongodb://localhost:27017/my_company', {useNewUrlParser: true, useUnifiedTopology: true});



const create_daily = (req, res, next)=>{

    return res.render('../views/daily/create_daily.ejs',  {name : 'блокно : '})
}


const save_daily = (req, res, next)=>{



    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))


    const Cat = mongoose.model('secretary', {
                                             topic: String, 
                                             content: String,
                                            //  occur_time: Date, 
                                             created_at: Date,
                                             updated_at: Date,
                                            

                                            }, 'secretary');

    const kitty = new Cat({ topic:req.body.topic ,
                            content: req.body.content ,
                            created_at:Date.now(), 
                            updated_at:Date.now()});

    kitty.save().then(() => console.log('meow'));
  
    console.log(req.body.topic)

   
}

module.exports = {
    create_daily,
    save_daily,
}