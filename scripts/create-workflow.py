"""Rebuild the one-page local workflow; no publisher content or secrets included."""
from pathlib import Path
from math import atan2, cos, sin, pi
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'output/pdf/Fahm-workflow.pdf'
DEST.parent.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(DEST), pagesize=(1200, 850))
c.setTitle('Fahm | Hardship & ease workflow')
c.setAuthor('Fahm')
BG, INK, MUTED, BLUE, LINE = map(HexColor, ['#fcfcfa', '#202520', '#656e67', '#294bc8', '#d7ddd7'])
c.setFillColor(BG); c.rect(0, 0, 1200, 850, fill=1, stroke=0)

def text(x, y, value, size=12, color=INK, font='Helvetica'):
    c.setFillColor(color); c.setFont(font, size); c.drawString(x, y, value)

def lines(x, y, value, width, size=12, leading=17, color=MUTED):
    for line in simpleSplit(value, 'Helvetica', size, width):
        text(x, y, line, size, color); y -= leading
    return y

def box(x, y, w, h, title, body, accent=False, small=False):
    c.setFillColor(HexColor('#eef1ff') if accent else HexColor('#ffffff'))
    c.setStrokeColor(BLUE if accent else LINE); c.setLineWidth(0.8)
    c.roundRect(x,y,w,h,7,fill=1,stroke=1)
    text(x+17,y+h-25,title,14 if small else 17,BLUE if accent else INK,'Helvetica-Bold')
    lines(x+17,y+h-46,body,w-34,11.5 if small else 12,16)

def arrow(points, color=LINE, dash=False):
    c.setStrokeColor(color); c.setFillColor(color); c.setLineWidth(1.2)
    c.setDash(4,3) if dash else c.setDash()
    p=c.beginPath(); p.moveTo(*points[0])
    for v in points[1:]: p.lineTo(*v)
    c.drawPath(p)
    c.setDash()
    a,b=points[-2:]; t=atan2(b[1]-a[1],b[0]-a[0]); r=6
    p=c.beginPath(); p.moveTo(*b)
    p.lineTo(b[0]-r*cos(t-pi/6),b[1]-r*sin(t-pi/6)); p.lineTo(b[0]-r*cos(t+pi/6),b[1]-r*sin(t+pi/6)); p.close()
    c.drawPath(p,fill=1,stroke=0)

text(40,804,'Fahm.',30,BLUE,'Helvetica-Bold')
text(40,773,'Hardship & ease: the complete reading flow',25,INK,'Helvetica-Bold')
text(40,747,'Start with a topic. Follow its sources. Return to your place.',13,MUTED)
text(968,805,'LOCAL EXPERIENCE',10,BLUE,'Helvetica-Bold')
text(990,784,'10 November 2026',11,MUTED)
c.setStrokeColor(LINE); c.line(40,727,1160,727)

box(40,613,240,85,'01  Explore','Search by a topic or alias; use category filters.')
box(350,613,300,85,'02  Hardship & ease','Overview, Quran passage, related hadith, context, and related topics.',True)
box(850,613,310,85,'Keep exploring','Patience and Gratitude link to short reference-led drafts.')
arrow([(280,655),(350,655)],BLUE)
arrow([(650,655),(850,655)],BLUE)
text(704,670,'Optional next topic',10,MUTED)
# Both reading paths can be entered directly from the topic.
arrow([(500,613),(500,579),(300,579),(300,548)],BLUE)
arrow([(500,579),(900,579),(900,548)],BLUE)
box(40,465,520,83,'03A  Quran passage: 94:5-6','Arabic + Saheeh International translation. Read normally or word by word.',True)
box(640,465,520,83,'03B  Complete hadith: Muslim 2999','Full Arabic + English, publisher grade, narrator, and translation credit.',True)
# Optional detail panels.
arrow([(300,465),(300,439),(120,439),(120,408)])
arrow([(300,439),(300,408)])
arrow([(300,439),(480,439),(480,408)])
box(40,330,160,78,'Word detail','Meaning and exact verse location.',small=True)
box(220,330,160,78,'Read in context','All 8 verses of Ash-Sharh.',small=True)
box(400,330,160,78,'Commentary','Published Ibn Kathir explanation.',small=True)
arrow([(200,368),(220,368)])
arrow([(300,330),(300,302)])
box(220,230,160,72,'Full reader','Read all 8 verses; return to topic.',small=True)
text(40,276,'Quran actions',10,BLUE,'Helvetica-Bold')
lines(40,257,'Copy with credits; inspect verse sources and translator notes.',160,11,15)
lines(400,272,'Close a detail panel to return to the same topic. Escape restores focus.',160,11,15)
arrow([(900,465),(900,439),(760,439),(760,408)])
arrow([(900,439),(1040,439),(1040,408)])
box(640,330,240,78,'Published explanation','Expand the explanation and four publisher notes.',small=True)
box(920,330,240,78,'Check or copy sources','Publisher edition, bibliography, credited copy, source links.',small=True)
arrow([(760,330),(760,302)])
arrow([(1040,330),(1040,302)])
box(640,230,520,72,'Return to your place','Close the panel or press Escape. External sources open in another tab.',small=True)

# Recovery and supporting information remain distinct from the main reading route.
c.setStrokeColor(LINE); c.line(40,207,1160,207)
text(40,182,'WHEN A SOURCE CANNOT LOAD',10,BLUE,'Helvetica-Bold')
box(40,90,520,75,'Unavailable -> retry -> continue','Wait for any provider cooldown, then retry. An original-source link is available.',small=True)
text(640,182,'SUPPORTING PAGES',10,BLUE,'Helvetica-Bold')
box(640,90,520,75,'Sources / About','View publisher credits and the editorial approach. Theme and Arabic text size stay in this browser.',small=True)
text(40,61,'No account or saving is required to use these reading paths.',11,INK)
text(40,38,'Content: Quran Foundation (Quran, words, tafsir) + HadeethEnc.com (hadith). Topic links are editorial.',10,MUTED)
text(640,61,'Still pending: qualified editorial review and a five-person usability study.',11,INK)
text(640,38,'Local engineering milestone; public launch, audio, and all-chapter navigation remain future work.',10,MUTED)
c.showPage(); c.save()
print(DEST)
