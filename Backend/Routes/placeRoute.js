const express = require('express');
const Places = require('../Models/Places');
const  City = require('../Models/cities');
const  Country = require('../Models/Countries');
const Comment = require('../Models/Comments');
const router = express.Router();

router.use(express.json())



// GET Comment


router.get ( '/getComment/:countryId/:cityId/:placeId', async (request,response) => {
    const countryid = request.params.countryId
    const cityid = request.params.cityId
    try {
        
        const country = await Country.findById(countryid).populate({path: "cities.places.comments", populate:{ path: 'user', select:'name'}})
        // .exec(function (err, result){
        //     console.log(result);
        //     response.send(result)
        // })

        country.cities.forEach((element)=>{
            if(element._id == cityid){
                element.places.forEach(async (element)=>{
                    if(element._id == request.params.placeId ){
                      response.send(element)
                    }
                })
            }
        }) 
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// POST

// router.post ( '/createPlace2/:idCountry/:idCity', async (request,response) => {
//     const findCountry = await Country.findById(request.params.idCountry).select('cities')
//         const test = findCountry.cities.map(city => {
//             if (city._id  == request.params.idCity ){
//                 return city
//             }
//         })   
//     const findCity = await Country.findOne({_id: request.params.idCountry});
//     findCity['cities'].forEach ( city => {
//         if ( city._id == request.params.idCity){
//             const createPlaces = new Places ({
//                 name: request.body.name,
//                 location: request.body.location,
//                 image: request.body.image,
//                 typeOfPlace: request.body.typeOfPlace
//             })
//             city.places.push(createPlaces);
//             console.log(city.places);
//         }
//     })
//     if (!findCity){
//         return response.status(404).send("Not Found")
//     }
//     try {
//         await findCity.save()
//         response.status(201)
//         response.send(findCity)
//     }
//     catch(e) {
//         console.error(e)
//     }
//     console.log("Add"); 
//     if (!findCountry){
//         return response.status(404).send("Not Found")
//     }  
// })


// POST

router.post ( '/createComment', async (request,response) => {

    await Country.findById(request.body.idCountry).populate("cities.places.comments").then(country => {
        const cityid = request.body.idCity
        const user = request.body.iduser 
        country.cities.forEach(async (elem)=>{
            
            if(elem._id == cityid){
                elem.places.forEach(async (element)=>{
                    if(element._id == request.body.idplace ){
                        const creatComment = new Comment({
                            commentBody: request.body.commentBody,
                             user: request.body.iduser,
                             place: request.body.idplace,
                             })
                                await element.comments.push(creatComment)
                                await creatComment.save()
                    }
                })
                try {
              await country.save()
              response.status(201)
              let places= elem.places.filter(e=>{if(e._id == request.body.idplace ){
                  return e
            } })
              let result= await Comment.find({place:request.body.idplace}).populate('user')
              response.send({places,result})
          }
          catch(e) {
              console.error(e)
          }
            }
        })
    })
    console.log("Add");
})

// DELETE

router.delete ( '/deleteComment/:idCountry/:idCity/:idplace/:commentID', async (request,response) => {
   
    await Comment.findByIdAndDelete(request.params.commentID)
    // .then((comment)=>{
        // comment.save()
        // response.send('Done')
    // })
    console.log(request.params.idCountry);
    await Country.findById(request.params.idCountry).populate({path: "cities.places.comments", populate:{ path: 'user', select:'name'}}).then(country => {

        const cityid = request.params.idCity;
        const user = request.params.iduser;
        const place = request.params.idplace;

        country.cities.forEach(async (elem)=>{    
            if(elem._id == cityid){
                console.log("city "+ elem)
                elem.places.forEach(async (element)=>{
                    if(element._id == request.params.idplace){
                        console.log(element);
                       await element.comments.pull({_id: request.params.commentID})
                      
                       try {
                       await  country.save()
                        response.status(201)
                        response.send(element)
                    }
                    catch(e) {
                        console.error(e)
                    }
                        }
                    })
                    }})
             
       
    })
    console.log("Deleted");
})


module.exports = router ;