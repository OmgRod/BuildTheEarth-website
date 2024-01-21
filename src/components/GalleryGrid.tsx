import { Avatar, Badge, Group, SimpleGrid, Title, useMantineTheme } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';

import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import { useIsClient } from '../hooks/useIsClient';
import BackgroundImage from './BackgroundImage';

interface GalleryGridProps {
	images: GalleryGridImageProps[];
	style?: React.CSSProperties;
	gap?: any;
	showTooltipOnHover?: boolean;
}
interface GalleryGridImageProps {
	name?: string;
	date?: string;
	src: string;
	hash?: string;
	team?: { logo: string; name: string; slug: string };
	href?: string;
	onClick?: () => void;
	showTooltipOnHover?: boolean;
	noAnimation?: boolean;
}

function GalleryGrid(props: GalleryGridProps) {
	return (
		<SimpleGrid spacing={props.gap || 'md'} cols={2} style={props.style}>
			{props.images.map((i, index) => (
				<GalleryGridImage {...i} key={index} showTooltipOnHover={props.showTooltipOnHover} />
			))}
		</SimpleGrid>
	);
}

export default GalleryGrid;

export function GalleryGridImage(i: GalleryGridImageProps) {
	const theme = useMantineTheme();
	const isClient = useIsClient();
	const { hovered, ref } = useHover();
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: i.noAnimation ? 0 : 0.5, duration: i.noAnimation ? 0 : 0.5 }}
			>
				<BackgroundImage
					src={i.src}
					rootStyle={{
						width: '100%',
						aspectRatio: '16/9',
					}}
					onClick={i.onClick}
					className={i.href && 'hover-border'}
					ref={ref}
					blurDataURL={i.hash}
				>
					<div
						style={{
							height: '100%',
							position: 'relative',
							width: '100%',
							background: 'linear-gradient(160deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0,0.8))',
							opacity: i.showTooltipOnHover && !hovered ? 0 : 100,
							transition: 'opacity 0.3s ease-in-out',
						}}
					>
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								margin: theme.spacing.xl,
								textAlign: 'right',
								zIndex: 50,
							}}
						>
							<Title
								style={{
									color: 'var(--mantine-color-white)',
									textShadow: '0px 0px 28px #000',
									userSelect: 'none',
								}}
								order={2}
							>
								{i.name}
							</Title>
							<Group style={{ flexDirection: 'row-reverse' }}>
								{i.date && (
									<Badge variant="gradient" style={{ userSelect: 'none' }} size="sm">
										{isClient ? new Date(i.date).toLocaleDateString() : ''}
									</Badge>
								)}
								{i.team && (
									<Avatar src={i.team.logo} size={18} alt={i.team.name + ' Logo'}>
										{i.team.name}
									</Avatar>
								)}
							</Group>
						</div>
					</div>
				</BackgroundImage>
			</motion.div>
		</AnimatePresence>
	);
}
