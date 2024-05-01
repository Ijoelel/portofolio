import { Link } from "react-router-dom";
import api from "../api.json";
import { Slider } from "reactjs-simple-slider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Cert() {
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col gap-4 md:justify-center md:mt-0 md:flex-row">
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
			<div className="w-full md:w-4/5 md:h-4/5 flex p-6 justify-center items-center border-0 rounded-lg border-gray-700 md:border-2">
				<div className="overflow-x-auto w-full h-full">
					<table className="table table-pin-rows table-pin-cols table-xs sm:table-sm md:table-md lg:table-lg">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th className="text-base">Title</th>
								<th className="text-base">Date</th>
								<th className="text-base">From</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{api.result.map((item, i) => {
								return (
									<tr key={i}>
										<th>{i + 1}</th>
										<td>{item.title}</td>
										<td>{item.date}</td>
										<td>
											<a
												href={item.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-accent hover:text-slate-400"
											>
												{item.from}
											</a>
										</td>
										<td>
											<button
												className="btn btn-sm hover:bg-accent-focus"
												onClick={() =>
													document
														.getElementById(
															`my_modal_${i}`,
														)
														.showModal()
												}
											>
												Show
											</button>
										</td>
										<dialog
											id={`my_modal_${i}`}
											className="modal"
										>
											<div className="modal-box">
												{item.image.length > 1 ? (
													<Slider
														objectFit="contain"
														images={item.image}
														leftArrow={() => {
															return (
																<ChevronLeftIcon className="w-7 h-7 md:w-12 stroke-accent opacity-50 hover:opacity-100" />
															);
														}}
														rightArrow={() => {
															return (
																<ChevronRightIcon className="w-7 h-7 md:w-12 stroke-accent opacity-50 hover:opacity-100" />
															);
														}}
													/>
												) : (
													<img src={item.image[0]} />
												)}
											</div>

											<form
												method="dialog"
												className="modal-backdrop"
											>
												<button>close</button>
											</form>
										</dialog>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
