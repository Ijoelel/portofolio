import { Link } from "react-router-dom";

export default function Project() {
	return (
		<div className="w-screen h-screen flex items-center flex-col mt-4 gap-4 md:justify-center md:mt-0 md:flex-row ">
			<Link to="/" className="flex gap-3 absolute top-5 left-8">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 hover:stroke-accent"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
					/>
				</svg>
				<h1 className="hidden md:block hover:text-accent">
					Back to Home
				</h1>
			</Link>
			<div className="card card-compact w-96 bg-base-100 shadow-xl mt-16 md:mt-0">
				<figure>
					<img src="./img/project1.webp" alt="Portofolio" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Website Portofolio</h2>
					<p>
						Website yang saya buat untuk mendeskripsikan siapa dan
						apa kemampuan saya.
					</p>
					<div className="card-actions justify-end">
						<a
							href="http://exsciitwo.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="btn hover:bg-accent"
						>
							Visit
						</a>
					</div>
				</div>
			</div>
			<div className="card card-compact w-96 bg-base-100 shadow-xl">
				<figure>
					<img src="./img/project2.webp" alt="Website " />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Exsciitwo</h2>
					<p>Website yang saya buat sebagai kenang-kenangan.</p>
					<div className="card-actions justify-end">
						<a
							href="http://exsciitwo.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="btn hover:bg-accent"
						>
							Visit
						</a>
					</div>
				</div>
			</div>
			<div className="card card-compact w-96 bg-base-100 shadow-xl">
				<figure>
					<img src="./img/project3.webp" alt="Iqiyi-clone" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Web Cloning Iqiyi</h2>
					<p>
						Website yang saya buat untuk mengasah skill pengembangan
						website yang saya punyai, sekaligus sebagai project
						full-stack pertama saya.
					</p>
					<div className="card-actions justify-end">
						<a
							href="http://iqiyi-clone.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="btn hover:bg-accent"
						>
							Visit
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
