// function ShowHide(){
//     var container = document.getElementsByClassName("estadisticas1")[0];

//     if(container.style.visibility == "hidden"){
//         container.style.visibility = "visible";
//     }else{
//         container.style.visibility = "hidden";
//     }
// }
function selectDriver(button, estadisticaId) {
    // Primero ocultamos todas las estadísticas
    const allStats = document.querySelectorAll('.estadistica');
    allStats.forEach(stat => {
        stat.style.display = 'none';
    });

    // Luego mostramos la estadística correspondiente al botón presionado
    const selectedStat = document.getElementById(estadisticaId);
    if (selectedStat) {
        selectedStat.style.display = 'block';
    }
}
