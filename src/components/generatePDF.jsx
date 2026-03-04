import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Font
    const page = pdfDoc.addPage([595, 842]); // A4 portrait

    let y = 800;

    const write = (text, x, size = 10, gap = 12, color = rgb(0.2, 0.2, 0.2 )) => {
        const safe = normalizeText(text);
        page.drawText(safe, { x, y, size, font, color });
        y -= gap;
    };

    // Header
    write(`${data.root} Major Scale`, 40, 20, 32, rgb(0.8, 0, 0));
    
    // Horizontal Line
    lines(page, 40, y + 20, 550, y + 20, 2);

    // Scale Notes
    write(data.scale.join(" – "), 40, 14, 28, rgb(0.4, 0.4, 0.4));

    // Horizontal Line
    lines(page, 40, y + 10, 550, y + 10, 0.75);

    // Section Headers
    y -= 10;
    write("Modes", 50, 16, 0,);
    write("Chords", 220, 16, 0,);
    write("Chord Notes", 380, 16, 0,);

    // Horizontal Line
    lines(page, 40, y - 6, 550, y - 6, 0.75);

    // Vertical Line
    lines(page, 180, y + 20, 180, y - 140, 0.75);

    // Vertical Line
    lines(page, 340, y + 20, 340, y - 140, 0.75);

    // Rows
    y -= 20;

    for (let i = 0; i < 7; i++) {
        const mode = `${data.modes[i].degree}: ${data.modes[i].name}`;
        const chord = normalizeText(data.chords[i]);
        const notes = normalizeText(data.chordNotes[i].join(" – "));
        page.drawText(mode, { x: 50, y, size: 12, font });
        page.drawText(chord, { x: 220, y, size: 12, font });
        page.drawText(notes, { x: 380, y, size: 12, font });
        
        y -= 18;
    };

    // Horizontal Line
    lines(page, 40, y + 6, 550, y + 6, 0.75);

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