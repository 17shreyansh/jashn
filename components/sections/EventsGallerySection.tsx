'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { themeConfig } from '@/lib/config/theme';
import { Button } from '@/components/ui/Button';

// --- Types ---
interface GalleryItem {
  _id: string;
  title: string;
  category?: string; // Added for editorial feel
  url: string;
  mediaType: 'image' | 'video';
}

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// --- 3D Parallax Card Component ---
const ParallaxCard = ({ item, index }: { item: GalleryItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  const scale = useSpring(1, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    x.set(0);
    y.set(0);
  };

  return (
    <MotionBox
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        scale,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      sx={{
        position: 'relative',
        width: '100%',
        // Alternating heights for "Masonry" feel
        height: { xs: 300, md: index % 2 === 0 ? 450 : 350 }, 
        borderRadius: '2px', // Sharp, editorial corners
        overflow: 'visible', // Allow 3D effect to spill
        cursor: 'none', // We could add a custom cursor here
        mb: 4,
      }}
    >
      {/* The Image Container */}
      <MotionBox
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: isHovered 
            ? '0 30px 60px rgba(0,0,0,0.15)' // Deep premium shadow on hover
            : '0 10px 20px rgba(0,0,0,0.05)', // Subtle shadow normally
        }}
      >
        <Image
          src={item.url}
          alt={item.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        
        {/* Cinematic Grain Overlay */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }} />
        
        {/* Gradient Overlay for Text */}
        <Box 
          sx={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }} 
        />
      </MotionBox>

      {/* Floating Metadata */}
      <MotionBox
        style={{ translateZ: 40 }} // Pushes text physically forward in 3D space
        sx={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <Typography 
          variant="overline" 
          sx={{ color: '#D4AF37', letterSpacing: '0.2em', fontWeight: 900, fontSize: '0.9rem', textShadow: '0 3px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4)' }}
        >
          {item.category || "Highlight"}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ color: '#fff', fontFamily: themeConfig.fonts.heading, fontWeight: 700, fontSize: '1.5rem' }}
        >
          {item.title}
        </Typography>
      </MotionBox>
    </MotionBox>
  );
};

export default function EventsGallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Mock data fallback if API fails (for demonstration)
  const mockItems: GalleryItem[] = [
    { _id: '1', title: 'Royal Wedding', category: 'Ceremony', url: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800', mediaType: 'image' },
    { _id: '2', title: 'Gala Dinner', category: 'Corporate', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800', mediaType: 'image' },
    { _id: '3', title: 'Private Concert', category: 'Exclusive', url: 'https://images.unsplash.com/photo-1470229722913-7ea2d9864f80?q=80&w=800', mediaType: 'image' },
  ];

  useEffect(() => {
    fetch('/api/gallery?type=events&limit=6')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
            setItems(data.data.filter((item: GalleryItem) => item.mediaType === 'image'));
        } else {
            setItems(mockItems);
        }
      })
      .catch(() => setItems(mockItems));
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: '#FAFAFA', // Premium Off-White
        color: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Abstract Blob */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)', // Gold tint
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'flex-end', mb: 10 }}>
          
          {/* Header Typography */}
          <Box sx={{ maxWidth: '600px' }}>
            <MotionTypography
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              sx={{ 
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                fontWeight: 900,
                fontSize: { xs: 16, md: 18 },
                color: themeConfig.colors.luxury,
                mb: 2,
                display: 'block'
              }}
            >
              Curated Moments
            </MotionTypography>
            <MotionTypography
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{
                fontFamily: themeConfig.fonts.heading,
                fontSize: { xs: '3rem', md: '4.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#1a1a1a'
              }}
            >
              The Art of <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#666' }}>Celebration</span>
            </MotionTypography>
          </Box>

          {/* CTA Button */}
          {!isMobile && (
            <Link href="/gallery" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="lg">
                View Full Archive
              </Button>
            </Link>
          )}
        </Box>

        {/* Gallery Grid - "Broken Grid" / Masonry Feel */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start' // Important for masonry feel
          }}
        >
          {items.map((item, index) => (
             <Box 
                key={item._id} 
                sx={{ 
                    // Shift the second column down to create the "Masonry" offset effect
                    mt: { md: index % 3 === 1 ? 8 : 0 } 
                }}
            >
                <ParallaxCard item={item} index={index} />
             </Box>
          ))}
        </Box>

        {/* Mobile Button Bottom */}
        {isMobile && (
           <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
             <Link href="/gallery" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                    View Archive
                </Button>
             </Link>
           </Box>
        )}

      </Container>
    </Box>
  );
}