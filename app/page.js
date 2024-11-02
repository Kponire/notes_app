"use client"
import { Button, Container, Grid, Title, Text, Group, Box } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Index.module.css';
import { useEffect, useState } from 'react';

export default function Home() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className={styles.containerBody}>
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>NotesMaster</div>
        <nav>
          <Group className={styles.navLinks}>
            {
              token && (
                <Link href="/dashboard" className={styles.navLink} passHref>
                  Dashboard
                </Link>
              )
            }
            <Link href="/login" className={styles.navLink} passHref>
              Login
            </Link>
            <Link href="/register" className={styles.navLink} passHref>
              Register
            </Link>
          </Group>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <Title className={styles.heroTitle}>
            Your Ultimate Note-Taking App
          </Title>
          <Text className={styles.heroSubtitle}>
            Create, manage, and organize your notes like never before. Stay
            focused and productive with our sleek, intuitive interface that helps
            you capture every idea.
          </Text>
          <Link href="/register" passHref>
            <Button
              variant="filled"
              size="lg"
              
              className={styles.heroButton}
              radius="xl"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/hero.png"
            alt="Notes App Hero"
            width={500}
            height={500}
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <Container>
          <Title align="center" order={2}>
            What Makes NotesMaster Special?
          </Title>
          <Box className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>📝</span>
              <Text className={styles.featureTitle}>Seamless Note Management</Text>
              <Text className={styles.featureDescription}>
                Create, edit, and manage your notes with ease and efficiency, all in one place.
              </Text>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔒</span>
              <Text className={styles.featureTitle}>Top-Notch Security</Text>
              <Text className={styles.featureDescription}>
                Rest assured knowing your notes are safe with encrypted, private storage.
              </Text>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🌍</span>
              <Text className={styles.featureTitle}>Accessible Everywhere</Text>
              <Text className={styles.featureDescription}>
                Access your notes on any device, anytime, with cross-platform syncing.
              </Text>
            </div>
          </Box>
        </Container>
      </section>

      {/* Call to Action */}
      <section className={styles.callToAction}>
        <div className={styles.callToActionText}>
          Ready to Experience a New Level of Organization?
        </div>
        <Link href="/register" passHref>
          <Button
            variant="filled"
            size="lg"
            className={styles.callToActionButton}
            radius="xl"
            color="dark"
          >
            Get Started Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <Text className={styles.footerText}>
          &copy; {new Date().getFullYear()} NotesMaster. All rights reserved.
        </Text>
      </footer>
    </div>
    </div>
  );
}
