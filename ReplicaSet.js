
// Creación del Replicaset
// Para crear la replica por 3 nodos por cada uno de los puertos que se establecen
MiBaskReplicaSet = new ReplSetTest({name: "MiBaskReplicaSet", nodes: 3});

// Paso 2. Arrancar los procesos mongod de la replica. 
MiBaskReplicaSet.startSet()

// Paso 3. Arrancar el proceso de replica. 
MiBaskReplicaSet.initiate()

// Paso 5. Pruebo del grupo replica. 
conn=new Mongo("LAPTOP-CATRIVAL:20000")

// Paso 6. Conectar a una base de datos
testDB = conn.getDB("Baloncesto")

// Paso 7. Saber si este nodo es el nodo maestro. 
testDB.isMaster()

// Paso 8. Ahora insertar un conjunto de datos en el nodo primario 
testDB.equipos.insert(
{
    "_id": "88d4ec9af682fbd39a1b1682",
    "nombre": "Solitarios",
    "ciudad": "Vijes",
    "entrenador": "60d5ec9af682fbd39a1b1685",
    "jugadores": [],
    "partidosJugados": 4,
    "partidosGanados": 1,
    "partidosPerdidos": 3
});
testDB.equipos.insertMany(
[
    {
        "_id": "88d4ec9af682fbd39a1b1682",
        "nombre": "Solitarios",
        "ciudad": "Vijes",
        "entrenador": "60d5ec9af682fbd39a1b1685",
        "jugadores": [],
        "partidosJugados": 4,
        "partidosGanados": 1,
        "partidosPerdidos": 3
    },
    {
        "_id": "91d4ec9af682fbd39a1b1681",
        "nombre": "Wolfs",
        "ciudad": "Cartago",
        "entrenador": "51d5ec9af682fbd39a1b1685",
        "jugadores": [],
        "partidosJugados": 9,
        "partidosGanados": 6,
        "partidosPerdidos": 3
    },
    {
        "_id": "92d4ec9af682fbd39a1b1682",
        "nombre": "Tigers",
        "ciudad": "Jamundi",
        "entrenador": "20d5ec9af682fbd39a1b1685",
        "jugadores": [],
        "partidosJugados": 10,
        "partidosGanados": 4,
        "partidosPerdidos": 6
    }
]);

// Paso 9. Miramos si la data ha sido guardada satisfactoriamente
testDB.equipos.find().pretty()

// Paso 10. Mirar la cantidad de equipos
testDB.equipos.count()


// Paso 11. Comprobocación en el resto de los nodos
connnSecondary =new Mongo("LAPTOP-CATRIVAL:20001")
secondaryTestDB = connnSecondary.getDB("Baloncesto")
secondaryTestDB.isMaster()

// Paso 12. Para admitir lectura y escritura. Habilitar permisos 
secondaryTestDB.setSecondaryOk()

// Paso 13. Verificar replica realizada.
secondaryTestDB.equipos.find().pretty()
secondaryTestDB.equipos.count()


// Detener el nodo primario. Primero conectamos con el puerto.
connnPrimary = new Mongo("LAPTOP-CATRIVAL:20000")
// Accedemos a la base de datos
primaryNode = connnPrimary.getDB("Baloncesto")
// Es Maestro.
primaryNode.isMaster()

// Paso 14. En ese este camo vamos al nodo primario que es el 20001. Vamos hacerlo parar, para ello emitimos el comando de apagado
primaryNode.adminCommand({shutdown : 1})

// Realizamos un nuevo nodo primario.  
newConnnPrimary = new Mongo("LAPTOP-CATRIVAL:20001")
newPrimaryDB = newConnnPrimary.getDB('Baloncesto')
newPrimaryDB.isMaster()


//Para terminar proceso de replicación 
MiBaskReplicaSet.stopSet();
