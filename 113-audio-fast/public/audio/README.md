# Audio Resources

This project features the piano rendition of *"Từng Ngày Yêu Em"* (`tung-ngay-yeu-em-piano.mp3`), arranged and included for the 12A1 20/10 gift website.

### Audio Options:
1. **Piano Soundtrack (`tung-ngay-yeu-em-piano.mp3`)**:
   Plays directly across the 13 interactive story scenes, feeding the Web Audio API `AnalyserNode` to synchronize the flower field sway and mascot Hoa's animations to the live rhythm.
2. **Built-in Web Audio API Synthesizer (Fallback)**:
   In the event that network constraints or unplayable audio codecs prevent the audio file from loading, the application automatically switches to a soothing harmonic music box chime via the Web Audio API at 60 FPS.
