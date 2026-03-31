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
    
    // Document details
    pdfDoc.setAuthor("Dimitris Ouzounis");
    pdfDoc.setCreator("Music Scale and Chord Generator");
    pdfDoc.setProducer("Music Scale and Chord Generator");
    pdfDoc.setTitle(`${data.root} Major Scale`);
    pdfDoc.setSubject("Music scales, modes and chords");
    pdfDoc.setKeywords(["music", "scales", "chords"]);
    
    // A4 portrait
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize(); 
    
    // Font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    // const fontSize = 20;
    
    const write = (text, x, y, size = 10, color = rgb(0.2, 0.2, 0.2 )) => {
        const safe = normalizeText(text);
        page.drawText(safe, { x, y, size, font, color });
    };

    const keySigBytes = await fetch(`/e-toolbox/assets/key_signatures/${data.root}.png`)
        .then(res => res.arrayBuffer());

    const keySigImage = await pdfDoc.embedPng(keySigBytes);

    // Header
    write(`${data.root} Major Scale`, 20, height - 40, 20, rgb(0.8, 0, 0));
    
    // Horizontal Line
    lines(page, 20, height - 50, 550, height- 50, 2);

    
    // Draw key signature PNG
    write(`Key signature`, 20, height - 70, 14, rgb(0.2, 0.2, 0.2));
    page.drawImage(keySigImage, {
        x: 20,
        y: height - 160,
        width: 160,
        height: 80,
        opacity: 0.8,
    });

    // Scale Notes
    write(data.scale.join(" – "), 20, height - 180, 14, rgb(0.4, 0.4, 0.4));

    // Horizontal Line
    lines(page, 20, height - 200, 550, height - 200, 0.75);

    // Section Headers
    write("Modes", 40, height - 220, 12);
    write("Chords", 220, height - 220, 12);
    write("Chord Notes", 380, height - 220, 12);
    
    // Horizontal Line
    lines(page, 20, height - 230, 550, height - 230, 0.75);
    
    // Vertical Line
    lines(page, 180, height - 200, 180, height - 380, 0.75);

    // Vertical Line
    lines(page, 340, height - 200, 340, height - 380, 0.75);

    // Rows
    let yAxis = height;
    for (let i = 0; i < 7; i++) {
        const mode = `${data.modes[i].degree}: ${data.modes[i].name}`;
        const chord = normalizeText(data.chords[i]);
        const notes = normalizeText(data.chordNotes[i].join(" – "));
        page.drawText(mode, { x: 40, y: yAxis - 250, size: 12, font });
        page.drawText(chord, { x: 220, y: yAxis - 250, size: 12, font });
        page.drawText(notes, { x: 380, y: yAxis - 250, size: 12, font });
        yAxis -= 20;
    };
    
    // Horizontal Line
    lines(page, 20, height - 380, 550, height - 380, 0.75);
    
    
    // Fretboard
    write(`Fretboard`, 20, height - 440, 14, rgb(0.2, 0.2, 0.2));
    if (data.fretboardImage) {
        const fretImg = await pdfDoc.embedPng(data.fretboardImage);

        page.drawImage(fretImg, {
            x: 60,
            y: height - 600,
            width: 440,
            height: 120,
        });
    }

    // Horizontal Line
    write(`Notes`, 20, height - 630, 14, rgb(0.2, 0.2, 0.2));
    lines(page, 20, height - 660, 550, height - 660, 0.75);
    lines(page, 20, height - 680, 550, height - 680, 0.75);
    lines(page, 20, height - 700, 550, height - 700, 0.75);
    lines(page, 20, height - 720, 550, height - 720, 0.75);
    lines(page, 20, height - 740, 550, height - 740, 0.75);
    lines(page, 20, height - 760, 550, height - 760, 0.75);

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