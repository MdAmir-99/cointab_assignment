const mysql = require( '../dbCon.js' );

const createUsers = async (req, res) =>
{
    try
    {
        let data = req.body;
        data = data[0];
        if ( data?.length === 0 )
            return res.status( 400 ).send( { status: false, message: 'please fill Data !' } )

        // Check email or phone already exist or not
        let isDuplicate = false;
        const isExistQuery = "SELECT email, phone FROM users";
        const isExist = await mysql(isExistQuery);

       if(isExist.length > 0){
        for(let i=0; i<isExist.length; i++){
            
            for(let j=0; j<data.length; j++){
                if(isExist[i].email === data[0]?.email || isExist[i].phone === data[j]?.cell ){
                    isDuplicate = true;
                }
            }
            if(isDuplicate)
                break;
        }
       }

       if(isDuplicate)
        return res.status(409).send({status : false, message : "Email or phone already exist !"})



        const query = "INSERT INTO users (firstName, lastName, country, email, phone, profileImage ) VALUES ?";
        const values = [ data?.map( elem => [ elem.name.first, elem.name.last, elem.location.country, elem.email, elem.cell, elem.picture.medium ] ) ];

        const result = await mysql(query, values);
        if(result.affectedRows > 0){
            return res.status(201).send({status:true, message : "Data Inserted Successfully !"})
        }

    } catch ( error )
    {
        return res.status( 500 ).send( { status: false, message: error.message } );
    }

}

const getUsers = async ( req, res ) =>
{
    try {
        const { email } = req.query;

    if(Object.keys(req.query).length === 0){
        const fetchQuery = "SELECT * FROM users";
        const userData = await mysql(fetchQuery);
        if(userData.length === 0)
            return res.status(400).send({status : false, message : "No Data Found !"});
        else
            return res.status(200).send({status : true, data : userData});
    }
    else{
        const fetchQuery = "SELECT * FROM users WHERE email=?";
        const userData = await mysql(fetchQuery, [email]);
        if(userData.length === 0)
            return res.status(400).send({status : false, message : "No Data Found !"});
        else
            return res.status(200).send({status : true, data : userData});
    }
        
    } catch (error) {
        return res.status( 500 ).send( { status: true, message: error.message } );
    }

}

const deleteUsers = async (req, res) =>
{
    try {

        const query = "TRUNCATE TABLE users";
        await mysql(query);
        return res.status( 200 ).send( { status: true, message:"Data Deleted Successfully !"});
        
    } catch (error) {
        return res.status(500).send({status : false, message: error.message});
    }
}

module.exports = { createUsers, deleteUsers, getUsers };