# parcialFlorenciaValentini

••• Se crean los models sin foreign key: •••
(en algunos caso se tuvo que forzar con el comando --force para reescribir los atributos que ya existían)

sequelize model:generate --name Category --attributes name:string

sequelize model:generate --name Payment --attributes type:string

sequelize model:generate --name Shipping --attributes type:string,date:date

sequelize model:generate --name Brand --attributes name:string

sequelize model:generate --name Color --attributes name:string

sequelize model:generate --name State --attributes description:string

sequelize model:generate --name Address --attributes street:String,number:integer,location:string,cp:integer

sequelize model:generate --name Size --attributes name:string

sequelize model:generate --name Gender --attributes type:string

••• Se crean los models con foreign key: •••

sequelize model:generate --name Order --attributes number:integer,date:date,user_id:integer,payment_id:integer,shipping_id:integer,state_id:integer

sequelize model:generate --name OrderDetail --attributes quantity:decimal,subtotal:decimal,order_id:integer,product_id:integer

sequelize model:generate --name Product --attributes name:string,price:decimal,stock:integer,stock_min:integer,stock_max:integer,brand_id:integer,category_id:integer,size_id:integer,gender_id:integer

sequelize model:generate --name User --attributes first_name:string,last_name:string,username:string,email:string,password:string,address_id:integer

sequelize model:generate --name Image --attributes name:string,url:string,product_id:integer

sequelize model:generate --name ColorProduct --attributes color:string,productId:integer,colorId:integer

••• Se definen las relaciones entre los modelos: •••

En model Address, relación con user:

Address.hasOne(models.User, { 
foreignKey: 'address_id', 
as: 'users' 
})

En model Brand, relación con product:

Brand.hasMany(models.Product, { 
foreignKey: 'brand_id', 
as: 'products' 
})

En model Category, relación con product:

Category.hasMany(models.Product, { 
foreignKey: 'category_id', 
as: 'products' 
})

En model Color, relación con product:

Color.belongsToMany(models.Product, { 
as: 'products', 
through: 'colorProduct' 
})

En model Gender, relación con product:

Gender.hasMany(models.Product, { 
foreignKey: 'gender_id', 
as: 'products' 
})

En model Image, relación con product:

Image.belongsTo(models.Product);

En model Order, relación con orderDetail, shipping, state, user, payment, address:

Order.hasMany(models.OrderDetail, { 
foreignKey: 'order_id', 
as: 'orderdetails' 
})

Order.hasOne(models.Shipping, { 
foreignKey: 'shipping_id', 
as: 'shippings' 
})

Order.belongsTo(models.State); 

Order.belongsTo(models.User); 

Order.belongsTo(models.Payment); 

Order.belongsTo(models.Address);

En model OrderDetail, relación con product:

OrderDetail.belongsTo(models.Product);

En model Payment, relación con order:

Payment.hasOne(models.Order, { 
foreignKey: 'payment_id', 
as: 'orders' 
})

En model Product, relación con orderDetail:

Product.hasOne(models.OrderDetail, { 
foreignKey: 'product_id', 
as: 'orderdetails' 
})

Product.belongsTo(models.Brand); 

Product.belongsTo(models.Category);

Product.hasMany(models.Image, { 
foreignKey: 'product_id', 
as: 'images' 
});

Product.belongsTo(models.Size); 

Product.belongsTo(models.Gender);

En model Shipping, relación con order:

Shipping.belongsTo(models.Order);

En model Size, relación con product:

Size.hasMany(models.Product, { 
foreignKey: 'size_id', 
as: 'products' 
})

En model State, relación con order:

State.hasOne(models.Order, { 
foreignKey: 'state_id', 
as: 'orders' 
})

En model User, relación con order:

User.hasMany(models.Order, { 
foreignKey: 'user_id', 
as: 'orders' 
})

••• Se modifican las referencias de las migraciones con foreign key: •••

Migración de user: 

address_id: { type: Sequelize.INTEGER, 
references:{ 
model:'addresses', 
key:'id' 
} }

Migración de product: 

brand_id: { type: Sequelize.INTEGER, 
references:{ 
model:'brands', 
key:'id' 
} }, 

category_id: { type: Sequelize.INTEGER, 
references:{ 
model:'categories', 
key:'id' 
} }, 

size_id: { type: Sequelize.INTEGER, 
references:{ 
model:'sizes', 
key:'id' 
} }, 

gender_id: { type: Sequelize.INTEGER, 
references:{ 
model:'genders', 
key:'id' 
} }

Migración de image product_id: 

{ type: Sequelize.INTEGER, 
references:{ 
model:'products', 
key:'id' 
} }

Migración color-product productId: 

{ type: Sequelize.INTEGER, 
references:{ 
model:'products', 
key:'id' 
} }, 

colorId: { type: Sequelize.INTEGER, 
references:{ 
model:'colors', 
key:'id' 
} }

Migración crder user_id: 

{ type: Sequelize.INTEGER, 
references:{ 
model:'users', 
key:'id' 
} }, 

payment_id: { type: Sequelize.INTEGER, 
references:{ 
model:'payments', 
key:'id' 
} }, 

shipping_id: { type: Sequelize.INTEGER, 
references:{ 
model:'shippings', 
key:'id' 
} }, 

state_id: { type: Sequelize.INTEGER, 
references:{ 
model:'states', 
key:'id' 
} }

Migración order-detail:

order_id: { type: Sequelize.INTEGER, 
references:{ 
model:'orders', 
key:'id' 
} }, 

product_id: { type: Sequelize.INTEGER, 
references:{ 
model:'products', 
key:'id' 
} }

••• Se modifican, si es necesario, los valores de las variables del archivo .env, con los datos de nuestra base de datos: •••

DB_USERNAME= root
DB_PASSWORD=
DB_HOST= localhost
DB_DATABASE=asequelize
DB_PORT=3306
DB_DIALECT=mysql

••• Finalmente ejecuta el siguiente comando: •••

sequelize db:migrate
