
//archivo que saque de firabase para iniciar (inicializa cloud firestore)
firebase.initializeApp({
    apiKey: 'AIzaSyDLaVedicqCbbFS9Go6CtbfX8COxlZTazk',
    authDomain: 'hola-1e1cf.firebaseapp.com',
    projectId: 'hola-1e1cf'
  });
  //archivo que saque en firabe donde dice agregar datos
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
//agregar documentos
function guardar(){
    //manejo del dom, creo variables para guardar los datos que recopilare en los input 
    let comentario =  document.getElementById("comentario").value

    db.collection("users").add({
        comentario: comentario
        
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("comentario").value="";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}
//leer documentos
let tabla= document.getElementById("tabla");
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ""; //la tabla aparece vacia
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().comentario}`);
        //la linea de abajo me permite imprimi los comentarios
        tabla.innerHTML += 
        ` <div class="card w-75 " style="margin-top:10%;">
        <div class="card-body">
          <h5 class="card-title">Comentario</h5>
          <p class="card-text">${doc.data().comentario}</p>
          <button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>
        </div>
      </div>
      `
    });
});

//borrar datos 
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


