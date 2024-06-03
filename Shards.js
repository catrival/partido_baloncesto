// Para levantar el clúster de réplica
cluster = new ShardingTest({
    shards: 3,
    chunksize:1 
})

// Iniciamos balanceador con el puerto designado y conectamos con la base de datos. 
db = (new Mongo("localhost:20006")).getDB("Baloncesto")


//Inserción de datos sobre el balanceador
// Ingresamos 1,500,000 registros en la tabla Entrenadores.
for (i= 0; i < 1500000; i++) {
    db.entrenadores.insert({
        _id: i,
        nombre: "idEntrenador_"+i,
        edad: 0,
        equipo: "idEquipo_"+i
    });  
}

// Para verificar la inserción. 
db.entrenadores.count()

// Abriremos una nueva consola de Mongo desde la que nos conectaremos a cada uno de los nodos con objetos distintos.
shard1 = new Mongo("localhost:20001")

//Nos conectamos a la base de datos Baloncesto.
shard1DB = shard1.getDB("Baloncesto")

// Verificamos la inserción de los registros.
shard1DB.entrenadores.count()


// Repetimos la misma secuencia para comprobar los registros que se han almacenado en la base de datos del segundo nodo del Shard.
shard2= new Mongo("localhost:20002");

// Nos conectamos a la base de datos Baloncesto.
shard2DB = shard2.getDB("Baloncesto");

//Verificamos la inserción de registros.
shard2DB.entrenadores.count();


// Repetimos la misma secuencia para comprobar los registros que se han almacenado en la base de datos del tercer nodo del Shard: 
shard3= new Mongo("localhost:20003") 

// Me conecto a la base de datos Baloncesto. 
shard3DB = shard3.getDB("Baloncesto")

//Verifico la inserción de registros. 
shard3DB.entrenadores.count()

// Activación del Sharding.
shard1 = new Mongo("localhost:20006")
sh.status()
sh.enableSharding("Baloncesto")

// Antes de habilitar los fragmentos, creará un índice en la clave que desea usar como shard.
db.entrenadores.ensureIndex({_id : 1})

// Ahora puede determinar la colección de acuerdo con "entrenador":
sh.shardCollection("Baloncesto.entrenadores", {_id: 1})

// Obtener el 
sh.shardCollection("Baloncesto.entrenadores", {author: 1})

//Para obtener los indices creados 
db.entrenadores.getIndexes()

//Si tenemos el nombre del índice que deseamos eliminar, podemos usar el siguiente comando para eliminarlo:
db.entrenadores.dropIndex("author")
db.entrenadores.dropIndex("_id")

// Para crear un índice lo podemos hacer de la siguiente manera. 
db.entrenadores.createIndex({_id : 1})


sh.shardCollection("Baloncesto.entrenadores", {_id: 1})

// Obtener balanceo 
sh.getBalancerState()

// Setear balanceo
sh.setBalancerState(true)
