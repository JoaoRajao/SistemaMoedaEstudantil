using Microsoft.EntityFrameworkCore;
using MoedaEstudantil.Data;
using MoedaEstudantil.DTOs;
using MoedaEstudantil.Entities;
using MoedaEstudantil.Enums;

namespace MoedaEstudantil.Services
{
    public class ProfessorService
    {
        private readonly MeritSystemContext _context;
        private readonly EmailService _emailService;

        public ProfessorService(MeritSystemContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public Professor CadastrarProfessor(ProfessorDTO professorDTO)
        {
            var professor = Professor.FromDto(professorDTO);

            _context.Professores.Add(professor);
            _context.SaveChanges();
            return professor;
        }

        public Professor GetProfessorById(Guid id)
        {
            return _context.Professores
                .Include(p => p.Instituicao)
                .FirstOrDefault(p => p.Id == id) ?? throw new Exception("Nao foi encontrado nenhum professor com este ID");
        }

        public List<Professor> GetAll()
        {
            return _context.Professores.ToList();
        }

        public bool AtualizarProfessor(ProfessorDTO atualizado, Guid id)
        {
            var professor = _context.Professores.Find(id);
            if (professor == null)
                return false;

            professor.Nome = atualizado.Nome;
            professor.Email = atualizado.Email;
            professor.Departamento = atualizado.Departamento;
            professor.Instituicao = atualizado.Instituicao;

            _context.SaveChanges();
            return true;
        }

        public bool DeletarProfessor(Guid id)
        {
            var professor = _context.Professores.Find(id);
            if (professor == null)
                return false;

            _context.Professores.Remove(professor);
            _context.SaveChanges();
            return true;
        }        
    }
}
