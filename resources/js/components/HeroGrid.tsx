import { useEffect, useRef } from 'react';

export function HeroGrid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            initNodes();
        };

        window.addEventListener('resize', handleResize);

        // Interactive mouse state with smooth easing
        const mouse = {
            x: width * 0.7,
            y: height * 0.4,
            targetX: width * 0.7,
            targetY: height * 0.4,
            radius: 220,
            active: false,
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Distributed computing node network simulation
        interface Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            baseAlpha: number;
            connections: number[];
            highlight?: boolean;
        }

        let nodes: Node[] = [];
        const NODE_COUNT = Math.min(Math.floor((width * height) / 22000), 55);

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 1.5,
                    baseAlpha: Math.random() * 0.4 + 0.3,
                    connections: [],
                    highlight: i % 7 === 0,
                });
            }
        };

        initNodes();

        let time = 0;
        const render = () => {
            time += 0.015;

            // Smooth mouse dampening
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            ctx.clearRect(0, 0, width, height);

            // 1. Draw subtle architectural coordinate grid
            const gridSize = 80;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';

            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // 2. Update and draw nodes + parametric connecting mesh
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Slow ambient drift
                node.x += node.vx;
                node.y += node.vy;

                // Boundary bounce
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Reactive mouse repulsion / wave influence
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (1 - dist / mouse.radius) * 0.8;
                    node.x -= (dx / dist) * force * 1.5;
                    node.y -= (dy / dist) * force * 1.5;
                }

                // Connect nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const ndx = node.x - nodeB.x;
                    const ndy = node.y - nodeB.y;
                    const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

                    if (nDist < 160) {
                        const alpha = (1 - nDist / 160) * 0.25;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                }

                // Draw Node Point
                const isNearMouse = dist < mouse.radius;
                const pointAlpha = isNearMouse ? 0.9 : node.baseAlpha;

                ctx.fillStyle = node.highlight
                    ? `rgba(56, 189, 248, ${pointAlpha})`
                    : `rgba(255, 255, 255, ${pointAlpha * 0.7})`;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.highlight ? node.radius * 1.4 : node.radius, 0, Math.PI * 2);
                ctx.fill();

                if (node.highlight || isNearMouse) {
                    // Soft glow ring
                    ctx.strokeStyle = `rgba(56, 189, 248, ${pointAlpha * 0.35})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, (node.radius + 4) + Math.sin(time + i) * 2, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // 3. Ambient interactive gradient spotlight follows mouse cursor
            const gradient = ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                20,
                mouse.x,
                mouse.y,
                450,
            );
            gradient.addColorStop(0, 'rgba(2, 132, 199, 0.12)');
            gradient.addColorStop(0.5, 'rgba(11, 25, 44, 0.05)');
            gradient.addColorStop(1, 'rgba(7, 15, 30, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#050610] pointer-events-none" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            {/* Seamless bottom vignette fading into #050610 */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050610] via-[#050610]/80 to-transparent" />
        </div>
    );
}
