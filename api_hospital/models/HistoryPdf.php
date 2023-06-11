<?php

class HistoryPdf
{
    static public function createPdf($paciente)
    {
        
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');
        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        
        // Establece el título del documento
        $pdf->SetTitle('Historial');

        // Agrega una página
        $pdf->AddPage();

        // Establece el contenido del PDF
        $pdf->SetFont('Helvetica', 'B', 16);
        $pdf->Cell(0, 16, 'Datos del paciente:', 0, 1, 'C');

        $pdf->SetFont('Helvetica', '', 12);
        $pdf->Cell(0, 10, 'Paciente: ' . $paciente["nombre"] . " " . $paciente["apellido"], 0, 1, 'D');
        $pdf->Cell(0, 10, 'Fecha de nacimiento: ' . $paciente["fec_nac"], 0, 1, 'D');
        $pdf->Cell(0, 10, 'Teléfono: ' . $paciente["telefono"], 0, 1, 'D');
        $pdf->Cell(0, 10, 'Direccion: ' . $paciente["direccion"], 0, 1, 'D');

        $pdf->Ln();
        $pdf->SetFont('Helvetica', 'B', 16);
        $pdf->Cell(0, 16, 'Historial clinico:', 0, 1, 'C');
        $pdf->Ln();

        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Antecedentes:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["antecedentes"], 0, 'L');

        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Medicamentos:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["medicamentos"], 0, 'L');
        
        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Vacunas:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["vacunas"], 0, 'L');
        
        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Pruebas:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["pruebas"], 0, 'L');
        
        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Consultas:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["consultas"], 0, 'L');
        
        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Cirugias:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["cirugias"], 0, 'L');
        
        $pdf->SetFont('Helvetica', 'B', 14);
        $pdf->Cell(0, 16, 'Observaciones:', 0, 1, 'C');
        $pdf->SetFont('Helvetica', '', 12);
        $pdf->MultiCell(0, 16, $paciente["notas"], 0, 'L');
        // Guarda el PDF en la carpeta "pdfs"
        $filename = $_SERVER['DOCUMENT_ROOT'] . 'api_hospital/tmp/'.$paciente["dni_paciente"].'.pdf';
        $pdf->Output($filename, 'F');
        return $filename;
    }
}
