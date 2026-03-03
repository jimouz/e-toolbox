import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function normalizeText(text) {
    return text.replace(/♭/g, "b");
}

export async function generatePDF(data) {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const page = pdfDoc.addPage([595, 842]); // A4 portrait

    let y = 800;

    const write = (text, x, size = 12, gap = 12) => {
        const safe = normalizeText(text);
        page.drawText(safe, { x, y, size, font, color: rgb(0, 0, 0) });
        y -= gap;
    };

    // Header
    write(`${data.root} Major Scale`, 50, 22, 32);
    // Horizontal Line
    page.drawLine({
        start: { x: 40, y: y + 20 },
        end:   { x: 550, y: y + 20 },
        thickness: 2,
        color: rgb(0.7, 0.7, 0.7),
    });

    write(normalizeText(data.scale.join(" – ")), 50, 14, 28);
    // Horizontal Line
    page.drawLine({
        start: { x: 40, y: y + 10 },
        end:   { x: 550, y: y + 10 },
        thickness: 0.75,
        color: rgb(0.7, 0.7, 0.7),
    });

    // Section Headers
    y -= 10;
    page.drawText("Modes", { x: 50, y, size: 16, font });
    page.drawText("Chords", { x: 220, y, size: 16, font });
    page.drawText("Chord Notes", { x: 380, y, size: 16, font });

    // Horizontal Line
    page.drawLine({
        start: { x: 40, y: y -6 },
        end:   { x: 550, y: y -6 },
        thickness: 0.75,
        color: rgb(0.7, 0.7, 0.7),
    });

    // Vertical Line
    page.drawLine({
        start: { x: 180, y: y + 20 },
        end:   { x: 180, y: y - 150 },
        thickness: 0.75,
        color: rgb(0.7, 0.7, 0.7),
    });

    // Vertical Line
    page.drawLine({
        start: { x: 340, y: y + 20 },
        end:   { x: 340, y: y - 150 },
        thickness: 0.75,
        color: rgb(0.7, 0.7, 0.7),
    });

    // Rows
    y -= 20;

    for (let i = 0; i < 7; i++) {
        const mode = `${data.modes[i].degree}: ${data.modes[i].name}`;
        const chord = normalizeText(data.chords[i]);
        const notes = normalizeText(data.chordNotes[i].join(" – "));

        // write(mode, 50, 12, 18);
        page.drawText(mode, { x: 50, y, size: 12, font });
        page.drawText(chord, { x: 220, y, size: 12, font });
        page.drawText(notes, { x: 380, y, size: 12, font });
        
        y -= 18;
    };

    // Horizontal Line
    page.drawLine({
        start: { x: 40, y: y -4 },
        end:   { x: 550, y: y -4 },
        thickness: 0.75,
        color: rgb(0.7, 0.7, 0.7),
    });

    return await pdfDoc.save();
}