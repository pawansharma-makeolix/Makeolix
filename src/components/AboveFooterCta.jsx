 <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 mb-10">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-(--bg-soft) p-8 rounded-3xl border border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all"
        >
          <h2 className="text-3xl mb-4 text-(--blue-3)">
            Let’s Grow Together
          </h2>

          <div className="flex gap-4 items-center mt-6">
           <Button>Book Call</Button>

            <motion.a whileHover={{ scale: 1.2 }} className="p-3 bg-green-500 rounded-full">
              <FaWhatsapp />
            </motion.a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-(--bg-soft) p-8 rounded-3xl border border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all"
        >
          <h3 className="mb-6 text-(--blue-2)">Quick Inquiry</h3>

          <input placeholder="Phone" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />
          <input placeholder="Budget" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />
          <textarea placeholder="Describe your project" className="w-full mb-4 bg-transparent border-b border-gray-600 p-2 focus:border-(--blue-3) outline-none" />

          <Button variant="outline">Submit</Button>
        </motion.form>
      </div>