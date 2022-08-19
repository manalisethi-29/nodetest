let _ = require('lodash')

module.exports.getUsersWithPostCount = async (req, res) => {
    try {
        const User = require('../schema/user.schema');
        const Post = require('../schema/post.schema');
        //TODO: Implement this API
        const filter = {};
        var final=[];
        let data={
            "users":final
        }
        let test = await Post.find()
            .populate({ path: "userId", select: "name -_id" })
            .then(function (err, stor) {
                if (err) return err;
            })
            .catch(error => console.log(error));
        let count = 0
        console.log(test.length);
        for (let doc = 0; doc < test.length; doc++) {

            for (let doc2 = 0; doc2 < test.length; doc2++) {
                if (test[doc].userId.name == test[doc2].userId.name) {
                    count = count + 1

                }
            }

            let id = _.get(test[doc], 'id')
            let name = _.get(test[doc], 'userId.name')
            let postCount = count
            let finalObject={
                "_id":id,
                "name":name,
                "posts":postCount
            }
            final.push(finalObject)
            count = 0;
        }
        jsonObject = final.map(JSON.stringify);
      
        console.log(jsonObject);
  
        uniqueSet = new Set(jsonObject);
        final = Array.from(uniqueSet).map(JSON.parse);

        final = await getUniqueListBy(final,"name")
        res.status(200).json({
           // message: 'Implement this API',
            data: data
        })
    } catch (error) {
        res.send({ error: error.message });
    }
    async function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
}
