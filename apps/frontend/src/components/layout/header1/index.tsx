import { AppShellHeader, Group, Text } from '@mantine/core';

import Image from 'next/image';
import HeaderProfile from './HeaderProfile';

export interface Header {}

const Header = () => {
	return (
		<AppShellHeader>
			<Group h="100%" px="md" justify="space-between">
				<Group>
					<Image
						src={'/logo.gif'}
						alt="Logo"
						unoptimized
						height={40}
						width={40}
						placeholder="blur"
						blurDataURL="data:image/webp;base64,UklGRt4CAABXRUJQVlA4WAoAAAAgAAAAtQAAtQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg8AAAAJAMAJ0BKrYAtgA+0WiwUyglpKKgSAEAGglpbt1euxvgCe16u6KuEQlQ/Dt6SncZxhF9Xdf0XOtOENaLR1am3TMoBTJgEGx6qLl0eH/XBH0rZF1YalUAqH/IrEns4tSusYi4fehRMKrMaSJCcAAA/us4+eTagZfrjdPBw+fyLyVUMvYN3Izb1pMDJuaEGFQPTdGRywaPa+yLLljmCotB18gzp9xPrQVo7uq7PIL4V8ac7spU+bRX4yOanYMBT9MJbnFmmP4CCFunzH6FY1zP8+SNs4iIt1JI8066DjXBRMd1iSHmp0Ud0vPut0H8wAAAAA=="
						style={{ marginRight: '4px' }}
					/>
					<Text fw="bold" ff="var(--font-minecraft)" fz="20px" m={0} display={{ base: 'none', xs: 'unset' }}>
						BuildTheEarth
					</Text>
				</Group>

				<Group gap="sm">
					<HeaderProfile />
				</Group>
			</Group>
		</AppShellHeader>
	);
};

export default Header;
