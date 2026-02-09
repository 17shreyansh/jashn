'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { themeConfig } from '@/lib/config/theme';
import { Button } from '@/components/ui/Button';

// --- Types ---
interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  url: string;
  date: string;
}

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// --- 3D Glare Card Component ---
const GlareCard = ({ item, index }: { item: GalleryItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });
  
  // Glare Effect Values
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionBox
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }} // "Expo" ease for luxury feel
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 400, md: 550 },
        mb: { xs: 4, md: 8 },
        cursor: 'none' // Suggests a custom cursor could be added
      }}
    >
      <MotionBox
        style={{ rotateX, rotateY }}
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
        }}
      >
        <Image
          src={item.url}
          alt={item.title}
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.1)' }} // Slight zoom for parallax
        />

        {/* Dynamic Glare/Reflection Layer */}
        <MotionBox
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            opacity: useTransform(x, (val) => Math.abs(val) * 0.6) // Only visible when tilting
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            mixBlendMode: 'overlay',
            pointerEvents: 'none'
          }}
        />

        {/* Text Overlay - Clean & Minimal */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transform: 'translateZ(30px)' // Text floats above image
          }}
        >
          <Typography variant="overline" sx={{ color: '#D4AF37', letterSpacing: '0.2em', mb: 1 }}>
            {item.date} — {item.category}
          </Typography>
          <Typography variant="h4" sx={{ color: '#fff', fontFamily: themeConfig.fonts.heading, fontWeight: 400 }}>
            {item.title}
          </Typography>
        </Box>
      </MotionBox>
    </MotionBox>
  );
};

export default function EventsGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax Transforms: Middle column moves slower than sides
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, 150]); // This one "drags" behind
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const isMobile = useMediaQuery('(max-width:900px)');

  const mockItems: GalleryItem[] = [
    { _id: '1', title: 'The Royal Union', category: 'Wedding', date: 'Oct 2025', url: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=600' },
    { _id: '2', title: 'Vogue Gala', category: 'Corporate', date: 'Sep 2025', url: 'https://images.unsplash.com/photo-1569930784237-d55084be30d1?q=80&w=600' },
    { _id: '3', title: 'Kyoto Seasons', category: 'Travel', date: 'Aug 2025', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600' },
    { _id: '4', title: 'Milan Fashion', category: 'Runway', date: 'Jul 2025', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600' },
    { _id: '5', title: 'Private Estate', category: 'Architecture', date: 'Jun 2025', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600' },
    { _id: '6', title: 'Desert Mirage', category: 'Expedition', date: 'May 2025', url: 'https://images.unsplash.com/photo-1470229722913-7ea2d9864f80?q=80&w=600' },
  ];

  useEffect(() => {
    fetch('/api/gallery?type=tours&limit=6')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setItems(data.data);
        } else {
          setItems(mockItems);
        }
      })
      .catch(() => setItems(mockItems));
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 10, md: 20 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Texture for "Paper" feel */}
      <Box 
        sx={{ 
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* Editorial Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 15, px: 2 }}>
          <Box>
             <Box sx={{ overflow: 'hidden' }}>
                <MotionTypography
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  sx={{ 
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.35em',
                    fontWeight: 300,
                    fontSize: { xs: 12, md: 14 },
                    color: themeConfig.colors.luxury,
                    mb: 1
                  }}
                >
                  Selected Works
                </MotionTypography>
             </Box>
             <Box sx={{ overflow: 'hidden' }}>
                <MotionTypography
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  sx={{ 
                    fontFamily: themeConfig.fonts.heading, 
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    fontWeight: 700,
                    color: '#1a1a1a', 
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Visual <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#666' }}>Archive</span>
                </MotionTypography>
             </Box>
          </Box>

          {!isMobile && (
            <Link href="/gallery" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="lg">
                View All Collections
              </Button>
            </Link>
          )}
        </Box>

        {/* Parallax Grid */}
        <Box sx={{ display: 'flex', gap: 6, flexDirection: { xs: 'column', md: 'row' } }}>
          
          {/* Column 1 - Moves Slightly Up */}
          <MotionBox style={{ y: isMobile ? 0 : yColumn1 }} sx={{ flex: 1, pt: { md: 0 } }}>
            {items.slice(0, 2).map((item, i) => (
               <GlareCard key={item._id} item={item} index={i} />
            ))}
          </MotionBox>

          {/* Column 2 - Moves Down (Drags) - creating the parallax offset */}
          <MotionBox style={{ y: isMobile ? 0 : yColumn2 }} sx={{ flex: 1, pt: { md: 15 } }}>
            {items.slice(2, 4).map((item, i) => (
               <GlareCard key={item._id} item={item} index={i + 2} />
            ))}
          </MotionBox>

          {/* Column 3 - Moves Slightly Up */}
          <MotionBox style={{ y: isMobile ? 0 : yColumn3 }} sx={{ flex: 1, pt: { md: 5 } }}>
             {items.slice(4, 6).map((item, i) => (
               <GlareCard key={item._id} item={item} index={i + 4} />
            ))}
          </MotionBox>

        </Box>
      </Container>
    </Box>
  );
}