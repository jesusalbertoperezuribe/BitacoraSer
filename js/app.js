const dimensions = [
    { name: 'Crecimiento personal', level: 9 },
    { name: 'Trabajo/Estudio', level: 7 },
    { name: 'Familia', level: 0 },
    { name: 'Salud', level: 5 },
    { name: 'Puntos de apoyo social', level: 7 },
    { name: 'Finanzas', level: 7 },
    { name: 'Espiritualidad', level: 1 }
];

const records = [
    ['Crecimiento personal', 'Viernes', 'No descuido mis frentes', 'Enfocado y con autocontrol', 'Mantener el equilibrio entre tareas previene el estrés acumulado.', 'image', 'assets/imagenes/Crecimiento personal viernes.jpeg', 'Crecimiento Personal - Viernes'],
    ['Crecimiento personal', 'Sábado', 'Salgo a conocer Bucaramanga', 'Curiosidad, asombro y libertad', 'Explorar nuevos entornos expande la perspectiva y renueva la creatividad.', 'image', 'assets/imagenes/crecimiento personal sabado.jpeg', 'Bucaramanga - Sabado'],
    ['Crecimiento personal', 'Domingo', 'Me doy el sol en la mañana', 'Tranquilidad, paz y vitalidad', 'Pausar para conectar con la naturaleza es fundamental para la salud mental.', 'image', 'assets/imagenes/crecimiento personal domingo.jpeg', 'Sol Manana - Domingo'],
    ['Crecimiento personal', 'Lunes', 'Aprendo inglés para mi futuro', 'Motivación y compromiso', 'Aprender inglés amplía mis oportunidades y me prepara mejor para mi futuro profesional.', 'image', 'assets/imagenes/crecimiento personal lunes.jpeg', 'Aprender Ingles - Lunes'],
    ['Trabajo/Estudio', 'Viernes', 'Practico git', 'Determinación y seguridad', 'La práctica constante consolida el dominio de las herramientas de control de versiones.', 'image', 'assets/imagenes/Estudio trabajo viernes.jpeg', 'Practica Git - Viernes'],
    ['Trabajo/Estudio', 'Sábado', 'Practico git y hago proyecto', 'Productividad y entusiasmo', 'Aplicar la teoría directamente en proyectos reales acelera la retención.', 'image', 'assets/imagenes/estudio trabajo sabado.jpeg', 'Proyecto Git - Sabado'],
    ['Trabajo/Estudio', 'Domingo', 'Empiezo y termino bitácora en Campusland', 'Satisfacción y logro cumplido', 'Cerrar ciclos el fin de semana permite iniciar el lunes con la mente despejada.', 'video', 'assets/videos/domingo estudio y trabajo.mp4', 'Bitacora Campusland - Domingo'],
    ['Trabajo/Estudio', 'Lunes', 'Soluciono un problema de Git que tengo desde el sábado', 'Alivio y satisfacción', 'Investigar y resolver un problema de Git fortalece mi autonomía para enfrentar retos técnicos.', 'image', 'assets/imagenes/estudio trabajo lunes.jpeg', 'Solucionar Git - Lunes'],
    ['Puntos de apoyo social', 'Viernes', 'Final de FIFA', 'Emoción, competencia sana y diversión', 'El esparcimiento en grupo fortalece lazos de amistad y despeja la mente.', 'video', 'assets/videos/Apoyo social viernes.mp4', 'Torneo FIFA - Viernes'],
    ['Puntos de apoyo social', 'Sábado', 'Conecto con mi grupo e ingeniero', 'Confianza y trabajo en equipo', 'La comunicación fluida con mentores y compañeros despeja dudas técnicamente complejas.', 'video', 'assets/videos/sabado apoyo social.mp4', 'Grupo e Ingeniero - Sabado'],
    ['Puntos de apoyo social', 'Domingo', 'Juego con niños', 'Alegría genuina y empatía', 'La simplicidad de los niños enseña a valorar el momento presente y reír más.', 'video', 'assets/videos/apoyo social domingo.mp4', 'Juego con Ninos - Domingo'],
    ['Puntos de apoyo social', 'Lunes', 'Comparto comida con mis compañeros, futuros colegas de trabajo', 'Compañerismo y cercanía', 'Compartir con mis compañeros fortalece los vínculos y construye un ambiente de trabajo colaborativo.', 'image', 'assets/imagenes/apoyo social lunes.jpeg', 'Compartir Comida - Lunes']
].map(([area, day, action, emotion, learning, mediaType, mediaSrc, placeholderText]) => ({
    area, day, action, emotion, learning, mediaType, mediaSrc,
    placeholder: `https://placehold.co/600x400/0f172a/22c55e?text=${encodeURIComponent(placeholderText)}`
}));

function getColorByLevel(level) {
    if (level <= 3) return { hex: '#ef4444' };
    if (level <= 6) return { hex: '#eab308' };
    return { hex: '#22c55e' };
}

function drawWheel() {
    const svg = document.getElementById('wheelSvg');
    const center = 250;
    const maxRadius = 180;
    const levels = 10;
    const angleStep = (2 * Math.PI) / dimensions.length;
    svg.replaceChildren();

    for (let level = levels; level >= 1; level -= 1) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const radius = (maxRadius / levels) * level;
        circle.setAttribute('cx', center);
        circle.setAttribute('cy', center);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', level % 2 === 0 ? 'rgba(148, 163, 184, 0.05)' : 'rgba(148, 163, 184, 0.02)');
        circle.setAttribute('stroke', 'rgba(148, 163, 184, 0.2)');
        circle.setAttribute('stroke-width', '1');
        svg.appendChild(circle);
    }

    dimensions.forEach((item, index) => {
        const startAngle = index * angleStep - Math.PI / 2;
        const endAngle = (index + 1) * angleStep - Math.PI / 2;
        const color = getColorByLevel(item.level).hex;
        const radius = (maxRadius / levels) * item.level;

        if (item.level > 0) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);
            path.setAttribute('d', `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`);
            path.setAttribute('fill', color);
            path.setAttribute('fill-opacity', '0.75');
            path.setAttribute('stroke', color);
            path.setAttribute('class', 'wheel-segment');
            path.addEventListener('click', () => {
                const filter = document.getElementById('filterArea');
                if ([...filter.options].some(option => option.value === item.name)) {
                    filter.value = item.name;
                    renderCards();
                }
            });
            svg.appendChild(path);
        }

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', center);
        line.setAttribute('y1', center);
        line.setAttribute('x2', center + maxRadius * Math.cos(startAngle));
        line.setAttribute('y2', center + maxRadius * Math.sin(startAngle));
        line.setAttribute('stroke', 'rgba(148, 163, 184, 0.4)');
        svg.appendChild(line);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const middleAngle = startAngle + angleStep / 2;
        label.setAttribute('x', center + (maxRadius + 32) * Math.cos(middleAngle));
        label.setAttribute('y', center + (maxRadius + 32) * Math.sin(middleAngle));
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('class', 'text-[10px] font-semibold fill-slate-700 dark:fill-slate-300');
        label.textContent = `${item.name} (${item.level})`;
        svg.appendChild(label);
    });
}

function renderScores() {
    document.getElementById('scoreList').innerHTML = dimensions.map(({ name, level }) => `
        <div class="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50">
            <span class="truncate pr-1">${name}</span><span class="font-bold px-2 py-0.5 rounded text-[10px] ${level >= 7 ? 'bg-emerald-500/20 text-emerald-600' : level >= 4 ? 'bg-amber-500/20 text-amber-600' : 'bg-red-500/20 text-red-600'}">${level}/10</span>
        </div>`).join('');
}

function renderCards() {
    const area = document.getElementById('filterArea').value;
    const day = document.getElementById('filterDay').value;
    const filtered = records.filter(record => (area === 'ALL' || record.area === area) && (day === 'ALL' || record.day === day));
    const grid = document.getElementById('cardsGrid');

    grid.innerHTML = filtered.length ? filtered.map(record => {
        const media = record.mediaType === 'video'
            ? `<video src="${record.mediaSrc}" controls poster="${record.placeholder}" class="w-full h-full object-cover"></video>`
            : `<img src="${record.mediaSrc}" alt="${record.action}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='${record.placeholder}';">`;
        return `<article class="glass-panel rounded-2xl overflow-hidden shadow-sm flex flex-col border border-slate-200 dark:border-slate-800">
            <div class="relative h-48 bg-slate-900 overflow-hidden">${media}<span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white">${record.day}</span><span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-600 text-white">${record.area}</span></div>
            <div class="p-5 flex-1 flex flex-col space-y-4"><div><div class="text-xs font-bold text-slate-400 uppercase mb-1">1. La Acción</div><p class="text-sm font-semibold">"${record.action}"</p></div><div><div class="text-xs font-bold text-slate-400 uppercase mb-1">2. La Emoción</div><span class="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-600">${record.emotion}</span></div><div class="pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto"><div class="text-xs font-bold text-slate-400 uppercase mb-1">3. El Aprendizaje</div><p class="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">${record.learning}</p></div></div>
        </article>`;
    }).join('') : '<div class="col-span-full text-center py-12 text-slate-400"><p class="text-sm">No hay registros para este filtro.</p></div>';
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    document.getElementById('themeIcon').className = document.documentElement.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});
document.getElementById('filterArea').addEventListener('change', renderCards);
document.getElementById('filterDay').addEventListener('change', renderCards);
drawWheel();
renderScores();
renderCards();