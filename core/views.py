from django.shortcuts import render
from .models import (
    Profile, SkillCategory, Experience,
    Project, Education, Achievement
)


def index(request):
    profile      = Profile.objects.first()
    skill_cats   = SkillCategory.objects.prefetch_related('skills').all()
    experiences  = Experience.objects.prefetch_related('bullets').all()
    projects     = Project.objects.all()
    educations   = Education.objects.all()
    achievements = Achievement.objects.all()

    return render(request, 'core/index.html', {
        'profile':      profile,
        'skill_cats':   skill_cats,
        'experiences':  experiences,
        'projects':     projects,
        'educations':   educations,
        'achievements': achievements,
    })
