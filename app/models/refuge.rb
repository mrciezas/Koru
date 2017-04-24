class Refuge < ApplicationRecord

  validates :name, presence: true

  belongs_to :country
  has_many :questionnaires
  has_many :refuge_entities
  has_many :entities, through: :refuge_entities
  has_many :refuge_questions
  has_many :questions, through: :refuge_questions

  enum status: [:good, :regular, :bad]

  def self.search_with search_value
    if search_value.present?
      joins(:country).where("refuges.name||refuges.city||refuges.address||countries.name ILIKE ?", "%#{search_value}%")
    else
      all
    end
  end

end
