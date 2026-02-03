'use client'

import { motion } from 'framer-motion'
import { themeConfig } from '@/lib/config/theme'

const MotionDiv = motion.div

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section - Dark Premium */}
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: themeConfig.colors.black,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(107, 70, 193, 0.15), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <MotionDiv 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ 
              color: themeConfig.colors.luxury, 
              letterSpacing: '0.25em', 
              fontWeight: 600, 
              fontSize: '0.75rem',
              marginBottom: '24px',
              textTransform: 'uppercase'
            }}>SINCE 2009</p>
            <h1 style={{ 
              fontFamily: themeConfig.fonts.heading, 
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 700,
              color: themeConfig.colors.white,
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>About Jashn Planners</h1>
            <div style={{ width: 80, height: 2, backgroundColor: themeConfig.colors.luxury, margin: '0 auto 32px' }} />
            <p style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              maxWidth: 700, 
              margin: '0 auto', 
              fontWeight: 300,
              lineHeight: 1.7
            }}>Creating unforgettable moments and extraordinary memories</p>
          </MotionDiv>
        </div>
      </div>

      {/* Story Section - Light */}
      <div style={{ padding: 'clamp(96px, 15vw, 144px) 24px', backgroundColor: '#fafaf9' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p style={{ 
                color: themeConfig.colors.primary, 
                letterSpacing: '0.2em', 
                fontWeight: 600,
                fontSize: '0.75rem',
                marginBottom: '16px',
                textTransform: 'uppercase'
              }}>OUR STORY</p>
              <h2 style={{ 
                fontFamily: themeConfig.fonts.heading,
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 700,
                marginBottom: '32px',
                lineHeight: 1.2,
                color: themeConfig.colors.textDark
              }}>Designing Dreams,<br/>Crafting Reality</h2>
              <p style={{ 
                color: themeConfig.colors.textLight, 
                marginBottom: '24px', 
                fontSize: '1.0625rem', 
                lineHeight: 1.8 
              }}>
                Jashn Planners was founded with a simple vision: to transform ordinary moments into extraordinary memories. With over 15 years of experience in event planning and luxury travel, we bring creativity, precision, and passion to every project.
              </p>
              <p style={{ 
                color: themeConfig.colors.textLight, 
                marginBottom: '40px', 
                fontSize: '1.0625rem', 
                lineHeight: 1.8 
              }}>
                From intimate gatherings to grand celebrations, from exotic destinations to hidden gems, we curate experiences that reflect your unique style and exceed your expectations.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'Award-winning service excellence', 
                  'Expert team of certified professionals', 
                  'Exclusive worldwide partnerships'
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ color: themeConfig.colors.luxury, fontSize: '24px' }}>✓</span>
                    <p style={{ fontSize: '1rem', fontWeight: 500, color: themeConfig.colors.textDark, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}
            >
              {[
                { icon: '⭐', title: 'Award Winning', sub: 'Industry Leader' },
                { icon: '👥', title: 'Expert Team', sub: 'Dedicated Pros' },
                { icon: '🎉', title: 'Luxury Focus', sub: 'Premium Only' },
                { icon: '🌍', title: 'Global Reach', sub: 'Anywhere' },
              ].map((card, i) => (
                <MotionDiv
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{ 
                    padding: '32px', 
                    textAlign: 'center',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    border: `1px solid ${themeConfig.colors.luxury}20`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{card.icon}</div>
                  <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '4px', color: themeConfig.colors.textDark }}>{card.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, margin: 0 }}>{card.sub}</p>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* Why Choose Us - Dark Premium */}
      <div style={{ padding: 'clamp(96px, 15vw, 144px) 24px', backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeConfig.colors.luxury}15, transparent)`,
          filter: 'blur(100px)'
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ 
              color: themeConfig.colors.luxury, 
              letterSpacing: '0.2em', 
              fontWeight: 600,
              fontSize: '0.75rem',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>EXCELLENCE</p>
            <h2 style={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: themeConfig.colors.white,
              lineHeight: 1.2,
              margin: 0
            }}>Why Choose Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Personalized Service', desc: 'Every event and trip is tailored to your unique preferences and requirements.' },
              { title: 'Expert Team', desc: 'Our experienced professionals handle every detail with care and precision.' },
              { title: 'Premium Quality', desc: 'We partner with the best vendors and destinations to ensure excellence.' },
              { title: 'Stress-Free Experience', desc: 'Relax and enjoy while we manage all the logistics and coordination.' },
            ].map((item, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ 
                  padding: '40px', 
                  height: '100%',
                  borderRadius: '24px',
                  border: `1px solid ${themeConfig.colors.luxury}30`,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <span style={{ color: themeConfig.colors.luxury, fontSize: '32px', flexShrink: 0 }}>✓</span>
                  <div>
                    <h3 style={{ 
                      fontFamily: themeConfig.fonts.heading,
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                      color: themeConfig.colors.white
                    }}>{item.title}</h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      lineHeight: 1.8,
                      fontSize: '1rem',
                      margin: 0
                    }}>{item.desc}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
