import pptxgen from 'pptxgenjs';
import { PresentationDeck } from '../data/mockData';

export async function exportDeckToPowerPoint(deck: PresentationDeck): Promise<void> {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Maersk Training AI-Assisted Pitch Creation';
  pres.company = 'Maersk Training';
  pres.title = deck.title;

  // Define brand colors
  const DEEP_BLUE = '003E61';
  const MAERSK_BLUE = '42B0D5';
  const MID_BLUE = '1686BD';
  const PALE_BLUE = 'E2F3FB';
  const WHITE = 'FFFFFF';
  const GRAY_TEXT = '5A6B7C';

  deck.slides.forEach((s) => {
    const slide = pres.addSlide();

    // Slide 1: Cover Slide
    if (s.slideNumber === 1) {
      slide.background = { color: 'F8FAFC' };

      // Left Accent band
      slide.addShape(pres.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 0.25,
        h: '100%',
        fill: { color: MAERSK_BLUE },
      });

      // Maersk Training Title block
      slide.addText('MAERSK TRAINING', {
        x: 0.8,
        y: 0.8,
        w: 5.0,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: DEEP_BLUE,
        fontFace: 'Arial',
      });

      slide.addText('PEOPLE  |  SKILLS  |  A SAFER, CLEANER TOMORROW', {
        x: 0.8,
        y: 1.4,
        w: 6.0,
        h: 0.3,
        fontSize: 10,
        color: MID_BLUE,
        fontFace: 'Arial',
      });

      slide.addText(s.title, {
        x: 0.8,
        y: 2.2,
        w: 8.5,
        h: 1.2,
        fontSize: 38,
        bold: true,
        color: DEEP_BLUE,
        fontFace: 'Arial',
      });

      slide.addText(s.subtitle, {
        x: 0.8,
        y: 3.5,
        w: 8.5,
        h: 0.8,
        fontSize: 24,
        bold: true,
        color: MAERSK_BLUE,
        fontFace: 'Arial',
      });

      if (s.notes) {
        slide.addText(s.notes, {
          x: 0.8,
          y: 4.5,
          w: 8.0,
          h: 0.8,
          fontSize: 14,
          color: GRAY_TEXT,
          fontFace: 'Arial',
        });
      }

      // Metadata footer
      slide.addText(`Prepared for ${deck.customer}  •  ${deck.createdDate}  •  Maersk Training Commercial`, {
        x: 0.8,
        y: 6.2,
        w: 8.5,
        h: 0.4,
        fontSize: 11,
        color: GRAY_TEXT,
        fontFace: 'Arial',
      });
      return;
    }

    // Interior Slides
    slide.background = { color: 'FFFFFF' };

    // Top Header
    if (s.kicker) {
      slide.addText(s.kicker, {
        x: 0.8,
        y: 0.5,
        w: 8.0,
        h: 0.3,
        fontSize: 9,
        bold: true,
        color: MAERSK_BLUE,
        fontFace: 'Arial',
      });
    }

    slide.addText(s.title, {
      x: 0.8,
      y: 0.8,
      w: 8.5,
      h: 0.6,
      fontSize: 26,
      bold: true,
      color: DEEP_BLUE,
      fontFace: 'Arial',
    });

    slide.addText(s.subtitle, {
      x: 0.8,
      y: 1.45,
      w: 8.5,
      h: 0.4,
      fontSize: 14,
      color: MID_BLUE,
      fontFace: 'Arial',
    });

    // Divider line
    slide.addShape(pres.ShapeType.line, {
      x: 0.8,
      y: 1.95,
      w: 8.5,
      h: 0,
      line: { color: 'E2E8F0', width: 1 },
    });

    // Content: Key points
    if (s.keyPoints && s.keyPoints.length > 0) {
      s.keyPoints.forEach((kp, idx) => {
        const yPos = 2.2 + idx * 0.95;
        slide.addText(kp.title, {
          x: 0.8,
          y: yPos,
          w: 7.5,
          h: 0.35,
          fontSize: 13,
          bold: true,
          color: DEEP_BLUE,
          fontFace: 'Arial',
        });
        slide.addText(kp.desc, {
          x: 0.8,
          y: yPos + 0.3,
          w: 7.5,
          h: 0.55,
          fontSize: 11,
          color: GRAY_TEXT,
          fontFace: 'Arial',
        });
      });
    }

    // Content: Bullets
    if (s.bullets && s.bullets.length > 0) {
      const bulletItems = s.bullets.map((b) => ({
        text: b,
        options: {
          fontSize: 13,
          color: DEEP_BLUE,
          bullet: { code: '2022' },
          breakLine: true,
        },
      }));
      slide.addText(bulletItems, {
        x: 0.8,
        y: 2.3,
        w: 8.0,
        h: 3.5,
        fontFace: 'Arial',
      });
    }

    // Content: Metrics
    if (s.metrics && s.metrics.length > 0) {
      s.metrics.forEach((m, idx) => {
        const xPos = 0.8 + (idx % 2) * 4.2;
        const yPos = 2.3 + Math.floor(idx / 2) * 1.5;

        // Metric box
        slide.addShape(pres.ShapeType.roundRect, {
          x: xPos,
          y: yPos,
          w: 3.8,
          h: 1.25,
          rectRadius: 0.1,
          fill: { color: PALE_BLUE },
          line: { color: 'CBD5E1', width: 0.5 },
        });

        slide.addText(m.value, {
          x: xPos + 0.2,
          y: yPos + 0.15,
          w: 3.4,
          h: 0.5,
          fontSize: 22,
          bold: true,
          color: DEEP_BLUE,
          fontFace: 'Arial',
        });

        slide.addText(m.label, {
          x: xPos + 0.2,
          y: yPos + 0.65,
          w: 3.4,
          h: 0.45,
          fontSize: 11,
          color: GRAY_TEXT,
          fontFace: 'Arial',
        });
      });
    }

    // Slide footer
    slide.addText(`MAERSK TRAINING  |  ${deck.title.toUpperCase()}`, {
      x: 0.8,
      y: 6.8,
      w: 6.5,
      h: 0.3,
      fontSize: 9,
      color: '94A3B8',
      fontFace: 'Arial',
    });

    slide.addText(`${s.slideNumber}`, {
      x: 9.0,
      y: 6.8,
      w: 0.5,
      h: 0.3,
      fontSize: 9,
      align: 'right',
      color: '94A3B8',
      fontFace: 'Arial',
    });
  });

  const filename = `${deck.customer.replace(/[^a-zA-Z0-9]/g, '_')}_Presentation.pptx`;
  await pres.writeFile({ fileName: filename });
}
