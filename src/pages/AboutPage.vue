<template>
    <h1>GENERADOR DEL INFORME FINAL</h1>
    <button @click="descargarPDF()">Descargar</button>
</template>


<script setup>

import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'

const descargarPDF = () => {
    const nom = "Beiker Antonio Santorum Sasaguay"

    const doc = new jsPDF({
        orientation: "landscape",
        format: "a4",
        putOnlyUsedFonts: true,
    });

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const alignCenter = (doc.internal.pageSize.width || doc.internal.pageSize.getWidth()) / 2;
    const pageInicio = 30;
    const spaceInfo = 20;
    const spaceDate = 110;

    doc.setFont(undefined, 'bold');

    doc.setFontSize(14);
    doc.addImage("https://unl.edu.ec/sites/default/files/inline-images/unl_0.png", "PNG", 20, pageInicio - 10, 60, 35, "UNL");
    doc.text("UNIVERSIDAD NACIONAL DE LOJA", alignCenter + 30, pageInicio, { align: 'center' });
    doc.text("COMISIÓN DE ARTICULACIÓN DE LAS FUNCIONES SUSTANTIVAS", alignCenter + 30, pageInicio + 10, { align: 'center' });
    doc.text("INFORME FINAL DE CUMPLIMIENTO DEL TRABAJO ACADÉMICO", alignCenter + 30, pageInicio + 20, { align: 'center' });

    doc.setFontSize(13);

    doc.text("Facultad: ", spaceInfo, pageInicio + 40);
    doc.text("Carrera: ", spaceInfo, pageInicio + 50);
    doc.text("Docente: ", spaceInfo, pageInicio + 60);
    doc.text("Dedicación: ", spaceInfo, pageInicio + 70,);
    doc.text("Periodo Académico ordinario (PAO): ", spaceInfo, pageInicio + 80);
    doc.text("Total de horas planificadas en el PAO", spaceInfo, pageInicio + 90);
    doc.text("según dedicación docente: ", spaceInfo, pageInicio + 95);

    doc.setFont(undefined, 'normal');
    doc.text("Facultad de la Energía, las Industrias y los Recursos Naturales No Renovables ", spaceDate, pageInicio + 40);
    doc.text("Computacion ", spaceDate, pageInicio + 50);
    doc.text(nom, spaceDate, pageInicio + 60);
    doc.text("Tiempo Completo ", spaceDate, pageInicio + 70);
    doc.text("Octubre 2021 - Abril 2022", spaceDate, pageInicio + 80);
    doc.text("720", spaceDate, pageInicio + 93);

    doc.autoTable({
        styles: { fontSize: 12 },
        theme: "plain",
        headStyles: {
            halign: "center",
            valign: "middle",
            lineColor: 0,
            fillColor: [48, 102, 156],
            textColor: 255,
            lineWidth: 0.1,
            fontStyle: 'bold'
        },
        bodyStyles: {
            halign: "center",
            valign: "middle",
            textColor: 0,
            lineColor: 0,
            lineWidth: 0.1

        },
        head: [['Funciones Sustantivas', 'Actividades del Distributivo docente', 'Horas del PAO', 'Actividades Desarrolladas', 'Evidencias', 'Observaciones']],
        body: [
            ['Docencia',
                'AD1 - Teoria de la Programación COMPUTACIÓN',
                '162',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eum numquam minima earum ullam animi, saepe nulla eius reiciendis nesciunt esse, cupiditate veniam possimus. Suscipit in aspernatur iure culpa deserunt!',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eum numquam minima earum ullam animi, saepe nulla eius reiciendis nesciunt esse, cupiditate veniam possimus. Suscipit in aspernatur iure culpa deserunt!',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eum numquam minima earum ullam animi, saepe nulla eius reiciendis nesciunt esse, cupiditate veniam possimus. Suscipit in aspernatur iure culpa deserunt!'],
        ],
        startY: pageInicio + 105,
        margin: 20,

    })


    let str2 = "Your footer text";
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.text(str2, alignCenter / 2, pageHeight - 10, { align: 'center' });
    doc.output('dataurlnewwindow');


}
</script>