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
        const country = await Country.findById(countryid)

        country.cities.forEach((element)=>{
            if(element._id == cityid){
                element.places.forEach(async (element)=>{
                    if(element._id == request.params.placeId ){
                        console.log("ggg")
                        response.send(element.comments)
                        // const creatComment = new Comment({
                        //     commentBody: request.body.data.commentBody,
                        //      user: request.body.data.iduser,
                        //      place: request.body.data.idplace,
                        //      })
                        //         await element.comments.push(creatComment)
                        //         await creatComment.save()
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

    await Country.findById(request.body.data.idCountry).then(country => {
        const cityid = request.body.data.idCity
        const user = request.body.data.iduser 
        country.cities.forEach(async (elem)=>{
            
            if(elem._id == cityid){
                elem.places.forEach(async (element)=>{
                    if(element._id == request.body.idplace ){
                        const creatComment = new Comment({
                            commentBody: request.body.data.commentBody,
                             user: request.body.data.iduser,
                             place: request.body.data.idplace,
                             })
                                await element.comments.push(creatComment)
                                await creatComment.save()
                    }
                })
                try {
              await country.save()
              response.status(201)
              response.send(elem.places)
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

router.delete ( '/deleteComment', async (request,response) => {
   
    await Comment.findByIdAndDelete(request.body.data.commentID)
    // .then((comment)=>{
        // comment.save()
        // response.send('Done')
    // })
    await Country.findById(request.body.data.idCountry).then(country => {

        const cityid = request.body.data.idCity;
        const user = request.body.data.iduser;
        const place = request.body.data.idplace;
        const commentID = request.body.data.commentID;

        country.cities.forEach(async (elem)=>{    
            if(elem._id == cityid){
                console.log("city "+ elem)
                elem.places.forEach(async (element)=>{
                    console.log("مرحبا");
                    if(element._id == request.body.data.idplace){
                        console.log(element);
                       await element.comments.pull({_id: request.body.data.commentID})

                    // element.comments.forEach(async (element1)=>{
                    //         console.log("jjj")
                    //         if(element1._id == request.body.commentID){
                    //             console.log("ttt")
                    //             await element1.pull({_id: request.body.commentID})  
                    //         }
                        }
                    })
                    }})

                try {
              country.save()
              response.status(201)
              response.send("elem.places")
          }
          catch(e) {
              console.error(e)
          }
       
    })
    console.log("Deleted");
})


module.exports = router ;