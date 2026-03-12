import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const d = new Date();

// Replace flat symbol with "b"
function normalizeText(text) {
    return text.replace(/♭/g, "b");
};

// Draw Vertical & Horizontal lines
function lines(page, xStart, yStart, xEnd, yEnd, thickness, color=rgb(0.8, 0.8, 0.8)) {
    page.drawLine({
        start: { x: xStart, y: yStart },
        end:   { x: xEnd, y: yEnd },
        thickness: thickness,
        color,
    });
};

export async function generatePDF(data) {
    const pdfDoc = await PDFDocument.create();
    
    // A4 portrait
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize(); 

    // Treble clef
    const clefBytes = await fetch("/e-toolbox/assets/treble_clef.png").then(res => res.arrayBuffer());
    const clefImage = await pdfDoc.embedPng(clefBytes);
    
    // Font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // const fontSize = 20;
    
    const write = (text, x, y, size = 10, color = rgb(0.2, 0.2, 0.2 )) => {
        const safe = normalizeText(text);
        page.drawText(safe, { x, y, size, font, color });
    };

    // Header
    write(`${data.root} Major Scale`, 20, height - 40, 20, rgb(0.8, 0, 0));
    
    // Horizontal Line
    lines(page, 20, height - 50, 550, height- 50, 2);

    // Scale Notes
    write(data.scale.join(" – "), 20, height - 70, 14, rgb(0.4, 0.4, 0.4));

    // Horizontal Line
    lines(page, 20, height - 100, 550, height - 100, 0.75);

    // Section Headers
    write("Modes", 40, height - 120, 12);
    write("Chords", 220, height - 120, 12);
    write("Chord Notes", 380, height - 120, 12);
    
    // Horizontal Line
    lines(page, 20, height - 130, 550, height - 130, 0.75);
    
    // Vertical Line
    lines(page, 180, height - 100, 180, height - 280, 0.75);

    // Vertical Line
    lines(page, 340, height - 100, 340, height - 280, 0.75);

    // Rows
    let yAxis = height;
    for (let i = 0; i < 7; i++) {
        const mode = `${data.modes[i].degree}: ${data.modes[i].name}`;
        const chord = normalizeText(data.chords[i]);
        const notes = normalizeText(data.chordNotes[i].join(" – "));
        page.drawText(mode, { x: 40, y: yAxis - 150, size: 12, font });
        page.drawText(chord, { x: 220, y: yAxis - 150, size: 12, font });
        page.drawText(notes, { x: 380, y: yAxis - 150, size: 12, font });
        yAxis -= 20;
    };
    
    // Horizontal Line
    lines(page, 20, height - 280, 550, height - 280, 0.75);

    // Treble Clef
    page.drawImage(clefImage, {
        x: 30,
        y: height - 440,
        width: 30,
        height: 100,
    });
    const accidentalString =
        data.sharps > 0 ? "#".repeat(data.sharps) :
        data.flats > 0 ? "b".repeat(data.flats) :
        "";

    page.drawText(accidentalString, {
        x: 100,
        y: height - 400,
        size: 40,
        font,
        color: rgb(0.2, 0.2, 0.2)
    });

    // Horizontal Line
    lines(page, 20, height - 480, 550, height - 480, 0.75);

    // Date
    write(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`, 20, 20, 10);
    
    page.drawRectangle({
        x: 0,
        y: 0,
        width: 595,
        height: 60,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.5,
    });
    return await pdfDoc.save();
}