//Prueba de Sharding en MongoDB:
//Habilitar Sharding para una Colección:
sh.enableSharding("Baloncesto");


//Agregar un Shard al Cluster:
sh.addShard("__unknown_name__-rs0/LAPTOP-CATRIVAL:20000");
//Verificar el Estado del Balancer:
sh.status();

//Almacenamiento basado en Rango vs. Hash:
//Crear un Índice en la Clave de Shard:
db.miColeccion.createIndex({ campoShard: 1 });

//Asociar un Shard con una Zona:

sh.addShardToZone("__unknown_name__-rs0", "zone1");

//Fragmentación para Mejorar el Rendimiento:
//Migrar un Rango de Datos a Otro Shard:

sh.moveChunk("Baloncesto.entrenadores", { _id: 1 }, "__unknown_name__-rs2");

//Verificar si una Colección está Shardeada:
db.collections.find({ _id: "miBaseDeDatos.miColeccion", dropped: false });
