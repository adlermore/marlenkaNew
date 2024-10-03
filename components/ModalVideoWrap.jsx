'use client'

import { useState } from "react";
import videoSection from "@/public/images/videoSection.png"
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import Image from "next/image";

function ModalVideoWrap() {

	const [isOpen, setOpen] = useState(false);

	return (
		<div>
			<ModalVideo
				channel="youtube"
				youtube={{ mute: 0, autoplay: 1 }}
				autoplay={1}
				isOpen={isOpen}
				videoId="QiwtxINIVn8"
				onClose={() => setOpen(false)}
			/>

			<div className="relative mobile:min-h-[300px] cursor-pointer duration-300 hover:opacity-90" onClick={() => setOpen(true)}>
				<Image
					src={videoSection}
					alt="Ricardo portrait"
					priority={true}
					unoptimized={true}
					sizes="80vw"
					style={{
						objectFit: "cover",
					}}
					className='mobile:object-contain h-[300px]'
				/>
			</div>
		</div>
	)
}

export default ModalVideoWrap