var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckAdmin = async(user_id) => {
    var Query = `select * from bh_user where user_id = ? and user_status = 'active'`;
    var data = query(Query,[user_id]);
    return data;
};

module.exports.GetProduct = async(lang,category_id) => {
    var Query = `select p.product_id,product_name from bh_products p
    inner join bh_product_translations t on t.product_id = p.product_id
    inner join bh_languages l on t.language_id = l.language_id 
    inner join bh_product_prices pr on pr.product_id = p.product_id
    left join bh_product_images i on i.product_id = p.product_id
    where l.language_code = ? and p.product_status = 'active' and p.category_id = ?`;
    var data = query(Query,[lang,category_id]);
    return data;
}
// SELECT * FROM `bh_product_categories`

module.exports.GetCategory = async(search) => {
    var Query = `SELECT category_id FROM bh_product_categories where category_status = 'active' and lower(category_name) = '${search.toLowerCase()}' `;
    var data = query(Query);
    return data;
}
