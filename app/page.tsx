"use client"

export default function Home() {

	

	return (
		<>
		
		<div className="flex flex-col items-center gap-10 text-[#dbd8e3] mt-28 mb-10">
			<h1 className=" text-center text-[2.5rem] font-extrabold mb-14">Bienvenue sur <br /> Ez-Task</h1>
			<div className="flex gap-28 mt-10 md:mt-28">
				<section className="w-[90vw] lg:w-[40vw]  p-9 border-[#dbd8e3] border rounded-3xl shadow-md shadow-black font-semibold backdrop-blur-lg flex flex-col items-center justify-center gap-10">
					<h2 className="font-extrabold text-[1.8rem] p-5">Simplicité d’utilisation</h2>
					<p className="text-[1rem] md:text-[1.2rem]">Commencez à organiser vos tâches en quelques clics ! Notre plateforme a été conçue pour être intuitive, afin que vous puissiez vous concentrer sur l'essentiel : vos projets. Que vous soyez un expert en technologie ou non, la prise en main est immédiate. Vous n'avez besoin d'aucune formation préalable, chaque fonctionnalité est à portée de main pour vous permettre de commencer à travailler rapidement.</p>
				</section>
				<img src="/images/simple.jpeg" alt="" className="hidden lg:block w-[30vw] rounded-3xl shadow-md shadow-black  p-1 border-[#dbd8e3] border blur-[1px]"/>
			</div>
			<div className="flex gap-28 md:mt-28">
				<img src="/images/titre2.webp" alt="" className="hidden lg:block w-[30vw] rounded-3xl shadow-md shadow-black  p-1 border-[#dbd8e3] border blur-[1px]"/>
				<section className="w-[90vw] lg:w-[40vw]  p-9 border-[#dbd8e3] border rounded-3xl shadow-md shadow-black font-semibold backdrop-blur-lg flex flex-col items-center justify-center gap-10">
					<h2 className="font-extrabold text-[1.8rem] p-5">Inscription rapide et sans contrainte</h2>
					<p className="text-[1rem] md:text-[1.2rem]">Inscrivez-vous en un instant, sans formulaire interminable ni étape complexe. Quelques informations de base et vous êtes prêt à vous lancer. Notre objectif est de vous faire gagner du temps dès le début, en rendant le processus d'inscription aussi simple et rapide que possible. Plus besoin de passer par des configurations compliquées ou de longues validations.</p>
				</section>
			</div>
			<div className="flex gap-28 md:mt-28">
				<section className="w-[90vw] lg:w-[40vw]  p-9 border-[#dbd8e3] border rounded-3xl shadow-md shadow-black font-semibold backdrop-blur-lg flex flex-col items-center justify-center gap-10">
				<h2 className="font-extrabold text-[1.8rem] p-5">Un service 100% gratuit</h2>
				<p className="text-[1rem] md:text-[1.2rem]">Gérez vos projets en toute sérénité : notre service est entièrement gratuit. Nous croyons que tout le monde devrait avoir accès à un outil puissant et efficace, sans frais cachés ni abonnement à prévoir. Créez, collaborez et organisez vos tâches sans jamais vous soucier de limitations liées à un plan payant.</p>
				</section>
				<img src="/images/titre3.jpg" alt="" className="hidden lg:block w-[30vw] rounded-3xl shadow-md shadow-black  p-1 border-[#dbd8e3] border blur-[1px]"/>
			</div>
			<div className="flex gap-28 md:mt-28">
				<img src="/images/titre4.jpg" alt="" className="hidden lg:block w-[30vw] rounded-3xl shadow-md shadow-black  p-1 border-[#dbd8e3] border blur-[1px]"/>
				<section className="w-[90vw] lg:w-[40vw]  p-9 border-[#dbd8e3] border rounded-3xl shadow-md shadow-black font-semibold backdrop-blur-lg flex flex-col items-center justify-center gap-10">
				<h2 className="font-extrabold text-[1.8rem] p-5">Ouvert à tous : pour le travail collaboratif ou personnel</h2>
				<p className="text-[1rem] md:text-[1.2rem]">Que vous souhaitiez organiser vos tâches personnelles, gérer des projets en famille, ou collaborer avec une équipe, notre plateforme est faite pour vous. Travaillez seul ou invitez d'autres utilisateurs à rejoindre vos projets. Que ce soit pour le bureau, la maison, ou entre amis, nous offrons un environnement collaboratif flexible et adapté à toutes les situations.</p>
			</section>
			</div>
		</div>
		</>
	)
}
